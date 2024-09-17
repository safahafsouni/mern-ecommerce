import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import cors from 'cors';
import authRoutes from './routes/auth.route.js';
import categoryRoutes from './routes/category.route.js';
import productRoutes from './routes/product.route.js';

// configure environment variables
dotenv.config();

// database config
connectDB();

//rest api
const app = express();

// use middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);

// set port
const PORT = process.env.PORT || 8080;

// start server
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
