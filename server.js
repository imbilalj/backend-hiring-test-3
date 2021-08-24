import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
// Routes
import volumeRoutes from './routes/volumeRoutes.js';
import bookshelfRoutes from './routes/bookshelfRoutes.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Connecting to MongoDB
connectDB();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is up!');
});

// Volume Routes
app.use('/api/volumes', volumeRoutes);

// Bookshelf Routes
app.use('/api/bookshelves', bookshelfRoutes);

app.listen(
  PORT,
  console.log(
    `Books API server is listening on port ${PORT} and in ${process.env.ENV} mode!`
  )
);
