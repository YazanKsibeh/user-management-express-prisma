import { z } from 'zod';

// Register Schema
export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[0-9]/, 'Password must include at least one number')
    .regex(/[A-Z]/, 'Password must include at least one uppercase letter'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

// Login Schema
export const loginSchema = z.object({
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

// Update User Schema
export const updateUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format').optional(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[0-9]/, 'Password must include at least one number')
    .regex(/[A-Z]/, 'Password must include at least one uppercase letter')
    .optional(),
  confirmPassword: z.string().optional(),
  role: z.enum(['USER', 'ADMIN']).optional(),
}).refine(
  (data) => {
    // If password is provided, confirmPassword must be provided and match
    if (data.password) {
      if (!data.confirmPassword) {
        return false;
      }
      if (data.password !== data.confirmPassword) {
        return false;
      }
    }
    // If confirmPassword is provided without password, it's invalid
    if (data.confirmPassword && !data.password) {
      return false;
    }
    return true;
  },
  {
    message: "Password and confirmPassword must both be provided and match",
    path: ['confirmPassword'],
  }
);

// Validation middleware factory
export const validate = (schema) => {
  return (req, res, next) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Validation error',
          details: error.issues.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        });
      }
      next(error);
    }
  };
};

