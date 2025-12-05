import jwt from 'jsonwebtoken';

// Generate JWT token
export const generateToken = (payload) => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN || '24h';

  if (!secret) {
    throw new Error('JWT_SECRET is not configured');
  }

  return jwt.sign(payload, secret, { expiresIn });
};

// Verify JWT token
export const verifyToken = (token) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not configured');
  }

  return jwt.verify(token, secret);
};

