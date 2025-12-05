import express from 'express';
import { register, login } from '../controllers/auth.controller.js';
import { validate } from '../utils/validators.js';
import { registerSchema, loginSchema } from '../utils/validators.js';

const router = express.Router();

// POST /auth/register
router.post('/register', validate(registerSchema), register);

// POST /auth/login
router.post('/login', validate(loginSchema), login);

export default router;

