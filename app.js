import "dotenv/config";
import express from 'express';
import cors from 'cors';
import authRoutes from './src/routes/auth.routes.js';
import userRoutes from './src/routes/user.routes.js';
import adminRoutes from './src/routes/admin.routes.js';
import { errorMiddleware } from './src/middleware/error.middleware.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/admin', adminRoutes);

// Basic health check
app.get('/', (req, res) => {
  res.json({ message: 'User Management API' });
});

// Error handling middleware (must be last)
app.use(errorMiddleware);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown
const gracefulShutdown = async (signal) => {
  console.log('Shutting down gracefully...');

  server.close(() => {
    console.log('Server stopped');
    process.exit(0);
  });

  // Force close after 10 seconds
  setTimeout(() => {
    console.error('Shutdown timeout, forcing exit');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));