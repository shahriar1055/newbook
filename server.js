import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from './config/db.js';
import bookRoutes from './routes/bookRoutes.js';
import authRoutes from './routes/authRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import errorHandler from './middleware/errorHandler.js';

// Load .env values into process.env BEFORE anything reads them.
dotenv.config();

// Open the MongoDB connection. Crashes the process on failure.
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

// Order endpoints (place an order, list my orders) live under /api/orders.
app.use('/api/orders', orderRoutes);

// Tiny health check — proves the server is up without touching the DB.
app.get('/', (req, res) => res.send('BookStore API is running'));

// If no route above matched, treat it as a 404 and let the error
// handler shape the response.
app.use((req, res, next) => {
  res.status(404);
  next(new Error(`Not found: ${req.originalUrl}`));
});

// The global error catcher. Must be LAST so it sees errors from
// every route and middleware above.
app.use(errorHandler);

// Start accepting HTTP requests. Until this line runs, nothing is listening.
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});