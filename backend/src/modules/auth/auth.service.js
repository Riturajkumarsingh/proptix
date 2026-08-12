'use strict';

const bcrypt = require('bcrypt');
const prisma = require('../../config/database');
const { generateTokenPair, verifyRefreshToken, getRefreshCookieOptions } = require('../../config/jwt');
const { generateCode, generateSecureToken, hashToken, getTokenExpiry } = require('../../utils/helpers');
const { AppError } = require('../../middleware/errorHandler.middleware');
const { createAuditLog } = require('../../middleware/audit.middleware');
const logger = require('../../utils/logger');
const nodemailer = require('nodemailer');

const BCRYPT_ROUNDS = 12;

// ── Email Transporter ─────────────────────────────────────────────────────────
const createTransporter = () => nodemailer.createTransport({
  host:   process.env.SMTP_HOST,
  port:   parseInt(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendEmail = async ({ to, subject, html }) => {
  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from:    `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM}>`,
      to,
      subject,
      html,
    });
    logger.info(`Email sent to ${to}: ${subject}`);
  } catch (err) {
    logger.error('Email send error:', err);
    // Don't throw — email is non-critical for auth flow
  }
};

// ── Auth Service ──────────────────────────────────────────────────────────────

/**
 * Register a new user (Customer by default)
 */
const register = async (data, req) => {
  const { name, email, phone, password } = data;

  // Check duplicates
  const existing = await prisma.user.findFirst({
    where: { OR: [{ email }, { phone }] },
  });
  if (existing) {
    throw new AppError(
      existing.email === email
        ? 'An account with this email already exists.'
        : 'An account with this phone number already exists.',
      409
    );
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS);

  // Create user + customer profile in transaction
  const user = await prisma.$transaction(async (tx) => {
    const newUser = await tx.user.create({
      data: {
        name,
        email,
        phone,
        password:  hashedPassword,
        role:      'CUSTOMER',
        status:    'ACTIVE',
      },
    });

    await tx.customer.create({
      data: {
        userId:       newUser.id,
        customerCode: generateCode('CUS'),
      },
    });

    return newUser;
  });

  await createAuditLog({
    userId: user.id, action: 'REGISTER', entity: 'User', entityId: user.id,
    description: `New customer registration: ${email}`, req,
  });

  // Send welcome email (non-blocking)
  sendEmail({
    to:      email,
    subject: `Welcome to ${process.env.COMPANY_NAME}!`,
    html:    `<h2>Welcome, ${name}!</h2><p>Your account has been created successfully.</p>`,
  });

  return sanitizeUser(user);
};

/**
 * Login user and return tokens
 */
const login = async ({ email, password }, req) => {
  const user = await prisma.user.findUnique({
    where:  { email },
    select: {
      id: true, name: true, email: true, phone: true,
      password: true, role: true, status: true, avatar: true,
      associate: { select: { id: true, associateCode: true } },
      customer:  { select: { id: true, customerCode: true } },
    },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new AppError('Invalid email or password.', 401);
  }

  if (user.status !== 'ACTIVE') {
    throw new AppError(
      `Account ${user.status.toLowerCase()}. Please contact support.`,
      403
    );
  }

  // Generate tokens
  const { accessToken, refreshToken } = generateTokenPair(user);

  // Store refresh token hash in DB
  const hashedRefresh = await bcrypt.hash(refreshToken, 10);
  await prisma.user.update({
    where: { id: user.id },
    data: {
      refreshToken:  hashedRefresh,
      lastLogin:     new Date(),
      lastLoginIP:   req?.ip,
    },
  });

  await createAuditLog({
    userId: user.id, action: 'LOGIN', entity: 'User', entityId: user.id,
    description: `Login from ${req?.ip}`, req,
  });

  return { user: sanitizeUser(user), accessToken, refreshToken };
};

/**
 * Refresh access token using refresh token from cookie
 */
const refreshToken = async (token) => {
  if (!token) throw new AppError('Refresh token not found.', 401);

  const decoded = verifyRefreshToken(token);
  if (!decoded) throw new AppError('Invalid or expired refresh token.', 401);

  const user = await prisma.user.findUnique({
    where:  { id: decoded.id },
    select: { id: true, email: true, role: true, status: true, refreshToken: true },
  });

  if (!user || !user.refreshToken) throw new AppError('Session expired. Please log in again.', 401);
  if (user.status !== 'ACTIVE') throw new AppError('Account is inactive.', 403);

  // Verify stored refresh token
  const isValid = await bcrypt.compare(token, user.refreshToken);
  if (!isValid) throw new AppError('Invalid refresh token.', 401);

  // Generate new token pair (rotation)
  const tokens = generateTokenPair(user);
  const hashedRefresh = await bcrypt.hash(tokens.refreshToken, 10);
  await prisma.user.update({
    where: { id: user.id },
    data:  { refreshToken: hashedRefresh },
  });

  return tokens;
};

/**
 * Logout user — clear refresh token
 */
const logout = async (userId, req) => {
  await prisma.user.update({
    where: { id: userId },
    data:  { refreshToken: null },
  });

  await createAuditLog({
    userId, action: 'LOGOUT', entity: 'User', entityId: userId,
    description: 'User logged out', req,
  });
};

/**
 * Forgot password — send reset email
 */
const forgotPassword = async (email) => {
  const user = await prisma.user.findUnique({ where: { email } });
  // Always return success to prevent email enumeration
  if (!user) return;

  const token = generateSecureToken();
  const hashed = hashToken(token);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordResetToken:  hashed,
      passwordResetExpiry: getTokenExpiry(30), // 30 minutes
    },
  });

  const resetUrl = `${process.env.FRONTEND_URL}/auth/reset-password?token=${token}`;

  await sendEmail({
    to:      email,
    subject: 'Password Reset Request',
    html: `
      <h2>Password Reset</h2>
      <p>You requested a password reset. Click the link below (valid for 30 minutes):</p>
      <a href="${resetUrl}" style="background:#064E3B;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;">
        Reset Password
      </a>
      <p>If you didn't request this, ignore this email.</p>
    `,
  });
};

/**
 * Reset password using token
 */
const resetPassword = async ({ token, password }) => {
  const hashedToken = hashToken(token);

  const user = await prisma.user.findFirst({
    where: {
      passwordResetToken:  hashedToken,
      passwordResetExpiry: { gt: new Date() },
    },
  });

  if (!user) throw new AppError('Invalid or expired reset token.', 400);

  const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password:            hashedPassword,
      passwordResetToken:  null,
      passwordResetExpiry: null,
      refreshToken:        null,
    },
  });

  await sendEmail({
    to:      user.email,
    subject: 'Password Changed Successfully',
    html: '<p>Your password has been changed. If this wasn\'t you, contact support immediately.</p>',
  });
};

/**
 * Change password (authenticated user)
 */
const changePassword = async (userId, { currentPassword, newPassword }) => {
  const user = await prisma.user.findUnique({
    where:  { id: userId },
    select: { id: true, password: true, email: true },
  });

  if (!user) throw new AppError('User not found.', 404);

  const isValid = await bcrypt.compare(currentPassword, user.password);
  if (!isValid) throw new AppError('Current password is incorrect.', 400);

  const hashed = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);
  await prisma.user.update({
    where: { id: userId },
    data:  { password: hashed, refreshToken: null },
  });
};

/**
 * Get current user profile
 */
const getMe = async (userId) => {
  const user = await prisma.user.findUnique({
    where:  { id: userId },
    select: {
      id: true, name: true, email: true, phone: true,
      role: true, status: true, avatar: true, createdAt: true,
      associate: {
        select: {
          id: true, associateCode: true, commissionRate: true,
          totalSales: true, totalCommission: true,
          parent: { select: { id: true, user: { select: { name: true } } } },
        },
      },
      customer: { select: { id: true, customerCode: true, city: true } },
    },
  });
  if (!user) throw new AppError('User not found.', 404);
  return user;
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const sanitizeUser = (user) => {
  const { password, refreshToken, passwordResetToken, ...rest } = user;
  return rest;
};

module.exports = {
  register,
  login,
  refreshToken,
  logout,
  forgotPassword,
  resetPassword,
  changePassword,
  getMe,
};
