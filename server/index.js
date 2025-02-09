import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db/db.js';
import userRoute from './routes/user.js';
import blogRoute from './routes/blog.js';

dotenv.config({ path: './.env' });

const PORT = process.env.PORT || 5050;
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.get('/health', (req, res) => {
  console.log('status - ok');
  res.status(200).send('ok');
});

app.use('/user', userRoute);
app.use('/blog', blogRoute);

app.use((req, res, next) => {
  res.status(404).json({
    message: 'Route does not exist',
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'something went wrong',
  });
});

app
  .listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
  })
  .on('error', (err) => {
    console.error('failed to start server:', err);
  });
