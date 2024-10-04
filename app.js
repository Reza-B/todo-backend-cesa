import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { mongoURI } from './config/config.js';
import authRoutes from './routes/authRoutes.js';
import todoRoutes from './routes/todoRoutes.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger/swagger.json' assert { type: 'json' };

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// Swagger Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Database connection
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
