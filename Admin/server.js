import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// Import routes
import routes from './routes/routes.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());  // No need for bodyParser as express has it built-in

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);  // Exit process with failure if unable to connect
  }
};

// Start the server after connecting to MongoDB
connectDB();

// Use Routes
app.use('/api', routes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
