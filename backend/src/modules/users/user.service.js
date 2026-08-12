'use strict';

const prisma = require('../../config/database');
const bcrypt = require('bcrypt');
const { AppError } = require('../../middleware/errorHandler.middleware');
const { generateCode, buildSearchFilter, sanitize } = require('../../utils/helpers');
const { getPagination, getOrderBy } = require('../../utils/apiResponse');
const { createAuditLog } = require('../../middleware/audit.middleware');

const USER_SELECT = {
  id: true, name: true, email: true, phone: true,
  role: true, status: true, avatar: true,
  createdAt: true, updatedAt: true, lastLogin: true,
  createdBy: { select: { id: true, name: true } },
  associate:  { select: { id: true, associateCode: true, commissionRate: true } },
  customer:   { select: { id: true, customerCode: true } },
};

const getAllUsers = async ({ query }) => {
  const { page, limit, skip } = getPagination(query);
  const orderBy = getOrderBy(query, ['name', 'email', 'createdAt', 'lastLogin']);

  const where = {
    ...buildSearchFilter(query.search, ['name', 'email', 'phone']),
    ...(query.role   ? { role:   query.role }   : {}),
    ...(query.status ? { status: query.status } : {}),
  };

  const [users, total] = await Promise.all([
    prisma.user.findMany({ where, select: USER_SELECT, orderBy, skip, take: limit }),
    prisma.user.count({ where }),
  ]);

  return { users, total, page, limit };
};

const getUserById = async (id) => {
  const user = await prisma.user.findUnique({ where: { id }, select: USER_SELECT });
  if (!user) throw new AppError('User not found.', 404);
  return user;
};

const createUser = async (data, createdById, req) => {
  const { name, email, phone, password, role } = data;

  const existing = await prisma.user.findFirst({
    where: { OR: [{ email }, { phone }] },
  });
  if (existing) throw new AppError('Email or phone already registered.', 409);

  const hashed = await bcrypt.hash(password || 'Admin@123', 12);

  const user = await prisma.$transaction(async (tx) => {
    const newUser = await tx.user.create({
      data: { name, email, phone, password: hashed, role: role || 'CUSTOMER', createdById },
      select: USER_SELECT,
    });

    if (role === 'ASSOCIATE' || role === 'SUB_ASSOCIATE') {
      await tx.associate.create({
        data: {
          userId:        newUser.id,
          associateCode: generateCode('ASC'),
          parentId:      data.parentAssociateId || null,
          commissionRate: data.commissionRate || 2.5,
        },
      });
    } else if (role === 'CUSTOMER' || !role) {
      await tx.customer.create({
        data: { userId: newUser.id, customerCode: generateCode('CUS') },
      });
    }

    return newUser;
  });

  await createAuditLog({
    userId: createdById, action: 'CREATE', entity: 'User', entityId: user.id,
    description: `Created user ${email} with role ${role}`, req,
  });

  return user;
};

const updateUser = async (id, data, actorId, req) => {
  const { password, role, ...updateData } = data;
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new AppError('User not found.', 404);

  const updatePayload = sanitize(updateData);
  if (password) updatePayload.password = await bcrypt.hash(password, 12);
  if (role)     updatePayload.role = role;

  const updated = await prisma.user.update({
    where:  { id },
    data:   updatePayload,
    select: USER_SELECT,
  });

  await createAuditLog({
    userId: actorId, action: 'UPDATE', entity: 'User', entityId: id,
    description: `Updated user ${id}`, req,
  });

  return updated;
};

const updateUserStatus = async (id, status, actorId, req) => {
  const user = await prisma.user.update({
    where:  { id },
    data:   { status },
    select: USER_SELECT,
  });

  await createAuditLog({
    userId: actorId, action: 'STATUS_CHANGE', entity: 'User', entityId: id,
    description: `User ${id} status changed to ${status}`, req,
  });

  return user;
};

const deleteUser = async (id, actorId, req) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new AppError('User not found.', 404);

  await prisma.user.update({ where: { id }, data: { status: 'INACTIVE' } });

  await createAuditLog({
    userId: actorId, action: 'SOFT_DELETE', entity: 'User', entityId: id,
    description: `Soft-deleted user ${id}`, req,
  });
};

const getProfile = async (userId) => {
  return getUserById(userId);
};

const updateProfile = async (userId, data) => {
  const allowed = ['name', 'phone', 'avatar', 'avatarPublicId'];
  const updateData = sanitize(Object.fromEntries(
    Object.entries(data).filter(([k]) => allowed.includes(k))
  ));
  return prisma.user.update({ where: { id: userId }, data: updateData, select: USER_SELECT });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserStatus,
  deleteUser,
  getProfile,
  updateProfile,
};
