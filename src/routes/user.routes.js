import express from 'express';
import {
  getAllUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
} from '../controllers/user.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { roleMiddleware } from '../middleware/role.middleware.js';
import { validate, updateUserSchema } from '../utils/validators.js';

const router = express.Router();

// Get all users
router.get('/', authMiddleware, getAllUsersController);

// Get user by ID
router.get('/:id', authMiddleware, roleMiddleware, getUserByIdController);

// Update user
router.put('/:id', authMiddleware, roleMiddleware, validate(updateUserSchema), updateUserController);

// Delete user
router.delete('/:id', authMiddleware, roleMiddleware, deleteUserController);

export default router;

