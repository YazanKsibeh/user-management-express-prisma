import { z } from 'zod';

// Register Schema
export const registerSchema = z.object({
  name: z.string({ required_error: 'Name is required' }).min(2, 'Name must be at least 2 characters'),
  email: z.string({ required_error: 'Email is required' }).regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, 'Password must be at least 8 characters')
    .regex(/[0-9]/, 'Password must include at least one number')
    .regex(/[A-Z]/, 'Password must include at least one uppercase letter'),
  confirmPassword: z.string({ required_error: 'Confirm password is required' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

// Login Schema
export const loginSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format'),
  password: z.string({ required_error: 'Password is required' }),
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
        // Custom error messages for better UX
        const customMessages = {
          email: 'Email is required',
          password: 'Password is required',
          confirmPassword: 'Confirm password is required',
          name: 'Name is required',
        };

        return res.status(400).json({
          error: 'Validation error',
          details: error.issues.map((err) => {
            const fieldName = err.path[0];
            // If error is about undefined/missing field, use custom message
            if (err.code === 'invalid_type' && err.received === undefined) {
              return {
                field: err.path.join('.'),
                message: customMessages[fieldName] || `${fieldName} is required`,
              };
            }
            return {
              field: err.path.join('.'),
              message: err.message,
            };
          }),
        });
      }
      next(error);
    }
  };
};

