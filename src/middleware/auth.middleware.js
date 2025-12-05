import { verifyToken } from '../utils/jwt.js';

/**
 * Authentication middleware - verifies JWT token and attaches user info to request
 */
export const authMiddleware = (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    // Check if token exists
    if (!authHeader) {
      return res.status(401).json({
        error: 'Authentication token is required',
      });
    }

    // Extract token from "Bearer <token>" format
    const token = authHeader.startsWith('Bearer ')
      ? authHeader.substring(7)
      : authHeader;

    // Verify token and get user info
    const decodedUser = verifyToken(token);

    // Attach user info to request object for use in routes
    req.user = {
      id: decodedUser.id,
      email: decodedUser.email,
      role: decodedUser.role,
    };

    // Continue to next middleware/route handler
    next();
  } catch (error) {
    // Token is invalid or expired
    return res.status(401).json({
      error: 'Invalid or expired token',
    });
  }
};

