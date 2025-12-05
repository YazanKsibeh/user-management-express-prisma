import express from 'express';
import { register, login } from '../controllers/auth.controller.js';
import { validate } from '../utils/validators.js';
import { registerSchema, loginSchema } from '../utils/validators.js';

const router = express.Router();

// Register user
router.post('/register', validate(registerSchema), register);

// Login user
router.post('/login', validate(loginSchema), login);

export default router;

