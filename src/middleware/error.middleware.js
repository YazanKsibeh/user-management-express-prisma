// Error handling middleware - centralized error handling
export const errorMiddleware = (err, req, res, next) => {
  // Log error for debugging
  console.error('Error:', err.message);
  if (process.env.NODE_ENV === 'development') {
    console.error('Stack:', err.stack);
  }

  // Handle known error types
  if (err.message === 'Email already exists') {
    return res.status(409).json({
      error: 'Email already exists',
    });
  }

  if (err.message === 'Invalid credentials') {
    return res.status(401).json({
      error: 'Invalid credentials',
    });
  }

  if (err.message === 'User not found') {
    return res.status(404).json({
      error: 'User not found',
    });
  }

  // Default to 500 for unknown errors
  res.status(500).json({
    error: 'Internal server error',
  });
};

