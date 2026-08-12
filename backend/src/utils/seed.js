const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Hash a default password
  const salt = await bcrypt.genSalt(10);
  const defaultPassword = await bcrypt.hash('password123', salt);

  // 2. Create SUPER_ADMIN
  const superAdmin = await prisma.user.upsert({
    where: { email: 'admin@proptix.com' },
    update: {},
    create: {
      name: 'Super Admin',
      email: 'admin@proptix.com',
      phone: '9000000001',
      password: defaultPassword,
      role: 'SUPER_ADMIN',
      status: 'ACTIVE',
      emailVerified: true,
    },
  });
  console.log(`✅ Created Super Admin: ${superAdmin.email}`);

  // 3. Create ASSOCIATE
  const associate = await prisma.user.upsert({
    where: { email: 'associate@proptix.com' },
    update: {},
    create: {
      name: 'Demo Associate',
      email: 'associate@proptix.com',
      phone: '9000000002',
      password: defaultPassword,
      role: 'ASSOCIATE',
      status: 'ACTIVE',
      emailVerified: true,
    },
  });
  // Also create Associate profile
  await prisma.associate.upsert({
    where: { userId: associate.id },
    update: {},
    create: {
      userId: associate.id,
      associateCode: 'ASC-001',
    }
  });
  console.log(`✅ Created Associate: ${associate.email}`);

  // 4. Create CUSTOMER
  const customer = await prisma.user.upsert({
    where: { email: 'customer@proptix.com' },
    update: {},
    create: {
      name: 'Demo Customer',
      email: 'customer@proptix.com',
      phone: '9000000003',
      password: defaultPassword,
      role: 'CUSTOMER',
      status: 'ACTIVE',
      emailVerified: true,
    },
  });
  await prisma.customer.upsert({
    where: { userId: customer.id },
    update: {},
    create: {
      userId: customer.id,
      customerCode: 'CUST-001',
    }
  });
  console.log(`✅ Created Customer: ${customer.email}`);

  console.log('✅ Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
