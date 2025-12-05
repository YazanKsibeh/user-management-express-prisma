import { registerUser, loginUser } from '../services/auth.service.js';

/**
 * Register a new user
 */
export const register = async (req, res, next) => {
  try {
    const user = await registerUser(req.body);

    res.status(201).json({
      user,
      message: 'User registered successfully',
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

/**
 * Login user and return JWT token
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);

    res.status(200).json(result);
  } catch (error) {
    if (error.message === 'Invalid credentials') {
      return res.status(401).json({
        error: 'Invalid credentials',
      });
    }
    next(error);
  }
};

