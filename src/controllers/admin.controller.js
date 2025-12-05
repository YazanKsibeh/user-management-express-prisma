import { registerAdmin } from '../services/admin.service.js';

// Register a new admin user (Admin only)
export const registerAdminController = async (req, res, next) => {
  try {
    const admin = await registerAdmin(req.body);

    res.status(201).json({
      user: admin,
      message: 'Admin user created successfully',
    });
  } catch (error) {
    if (error.message === 'Email already exists') {
      return res.status(409).json({
        error: 'Email already exists',
      });
    }
    next(error);
  }
};

