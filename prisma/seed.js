import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import { hashPassword } from '../src/utils/password.js';
import 'dotenv/config';

// Validate DATABASE_URL is configured
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not configured');
}

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Get admin credentials from environment variables
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminName = process.env.ADMIN_NAME || 'System Admin';

  // Check if admin credentials are provided
  if (!adminEmail || !adminPassword) {
    console.log('⚠️  ADMIN_EMAIL or ADMIN_PASSWORD not set in .env');
    console.log('   Skipping admin seed. You can create admin manually.');
    return;
  }

  // Check if admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log(`✅ Admin already exists: ${adminEmail}`);
    return;
  }

  // Hash password
  const passwordHash = await hashPassword(adminPassword);

  // Create admin user
  const admin = await prisma.user.create({
    data: {
      name: adminName,
      email: adminEmail,
      passwordHash,
      role: 'ADMIN',
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  console.log('✅ Admin user created successfully:');
  console.log(`   Name: ${admin.name}`);
  console.log(`   Email: ${admin.email}`);
  console.log(`   Role: ${admin.role}`);
}

main()
  .catch((error) => {
    console.error('❌ Error seeding admin:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });

