// Role middleware - checks if user is Admin or Owner of the resource
export const roleMiddleware = (req, res, next) => {
  const currentUser = req.user;
  const resourceId = req.params.id;

  // Admin can access any resource
  if (currentUser.role === 'ADMIN') {
    return next();
  }

  // User can only access their own resource
  if (currentUser.id === resourceId) {
    return next();
  }

  // Access denied
  return res.status(403).json({
    error: 'Access denied. You can only access your own resources.',
  });
};

