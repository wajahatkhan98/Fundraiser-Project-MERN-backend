import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import walletRouter from './routes/walletRoutes.js';
import investRouter from './routes/investRoute.js';

dotenv.config();
await connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(cors('*'));
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/wallet', walletRouter);
app.use('/api/invest', investRouter);
app.use(notFound);
app.use(errorHandler);

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT} `)
);

process.on('unhandledRejection', (err, promise) => {
  console.log(`logged error: ${err}`);
  server.close(() => process.exit(1));
});
