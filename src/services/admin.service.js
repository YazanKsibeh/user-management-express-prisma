import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import { hashPassword } from '../utils/password.js';
import 'dotenv/config';

// Validate DATABASE_URL is configured
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not configured');
}

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Register admin user
export const registerAdmin = async (adminData) => {
  const { name, email, password } = adminData;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error('Email already exists');
  }

  const passwordHash = await hashPassword(password);

  const admin = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      role: 'ADMIN',
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  return admin;
};

