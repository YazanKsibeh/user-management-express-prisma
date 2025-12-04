import "dotenv/config";
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic health check
app.get('/', (req, res) => {
  res.json({ message: 'User Management API' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});