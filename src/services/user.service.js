import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import { hashPassword } from '../utils/password.js';
import 'dotenv/config';

const { Pool } = pg;

// Validate DATABASE_URL is configured
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not configured');
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Get all users
export const getAllUsers = async (userRole, userId) => {
  if (userRole === 'ADMIN') {
    return await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return user ? [user] : [];
};

// Get user by ID
export const getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

// Update user
export const updateUser = async (id, updateData, currentUser) => {
  const { name, email, password, role } = updateData;

  const existingUser = await prisma.user.findUnique({
    where: { id },
  });

  if (!existingUser) {
    throw new Error('User not found');
  }

  if (email && email !== existingUser.email) {
    const emailExists = await prisma.user.findUnique({
      where: { email },
    });

    if (emailExists) {
      throw new Error('Email already exists');
    }
  }

  const dataToUpdate = {};

  if (name) {
    dataToUpdate.name = name;
  }

  if (email) {
    dataToUpdate.email = email;
  }

  if (password) {
    dataToUpdate.passwordHash = await hashPassword(password);
  }

  if (role && currentUser.role === 'ADMIN') {
    dataToUpdate.role = role;
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: dataToUpdate,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return updatedUser;
};

// Delete user
export const deleteUser = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new Error('User not found');
  }

  await prisma.user.delete({
    where: { id },
  });

  return { message: 'User deleted successfully' };
};

