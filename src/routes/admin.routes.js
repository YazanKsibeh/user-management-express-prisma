import express from 'express';
import { registerAdminController } from '../controllers/admin.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { adminMiddleware } from '../middleware/admin.middleware.js';
import { validate, registerSchema } from '../utils/validators.js';

const router = express.Router();

// Create admin user (Admin only)
router.post('/register', authMiddleware, adminMiddleware, validate(registerSchema), registerAdminController);

export default router;

