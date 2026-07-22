import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';

dotenv.config();

// Connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
const corsOptions = {
  origin: process.env.CLIENT_URL ? [process.env.CLIENT_URL, 'http://localhost:5173', 'http://localhost:3000'] : '*',
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);

// Basic Route
app.get('/', (req, res) => {
  res.send('Job Portal API is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
