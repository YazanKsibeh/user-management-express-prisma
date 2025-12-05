import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import 'dotenv/config';

// Validate DATABASE_URL is configured
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not configured');
}

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Admin middleware - verifies ADMIN role from database for immediate effect
export const adminMiddleware = async (req, res, next) => {
  try {
    const currentUser = req.user;

    // Verify role from database to ensure role changes take effect immediately
    const user = await prisma.user.findUnique({
      where: { id: currentUser.id },
      select: { role: true },
    });

    if (!user || user.role !== 'ADMIN') {
      return res.status(403).json({
        error: 'Access denied. Admin privileges required.',
      });
    }

    // Update req.user with latest role from database
    req.user.role = user.role;

    next();
  } catch (error) {
    return res.status(500).json({
      error: 'Failed to verify admin privileges',
    });
  }
};

