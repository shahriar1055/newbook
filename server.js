import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from './config/db.js';
import bookRoutes from './routes/bookRoutes.js';



dotenv.config();


connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Global middleware — runs on every request, top to bottom.
app.use(cors());          // lets the React client (different port) call us
app.use(express.json());  // parses JSON request bodies into req.body

// Route prefix: any URL starting with /api/books goes to bookRoutes.
app.use('/api/books', bookRoutes);

// Auth endpoints (register, login) live under /api/auth.
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


