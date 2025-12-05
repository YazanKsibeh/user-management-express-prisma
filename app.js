import "dotenv/config";
import express from 'express';
import cors from 'cors';
import authRoutes from './src/routes/auth.routes.js';
import userRoutes from './src/routes/user.routes.js';
import adminRoutes from './src/routes/admin.routes.js';

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});