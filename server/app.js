require('dotenv').config({path: './server/.env'});

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const carRoutes = require('./routes/cars');
const userRoutes = require('./routes/users');
const contactRoutes = require('./routes/contact');

console.log('Environment Variables:', {
  MONGODB_URI: process.env.MONGODB_URI,
  PORT: process.env.PORT
});

// Initialize express app
const app = express();
const PORT = process.env.PORT;

// Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      retryWrites: true
    }).then(() => {

      const PORT = process.env.PORT
      app.listen(PORT, () => {
        console.log(`App listening on port: ${PORT}`);
      });

    });
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1); // Exit if DB connection fails
  }
};
connectDB();

// Middleware
const corsOptions = {
  origin: "https://autohaven-frontend.onrender.com"
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/cars', require('./routes/cars'));

// Request logging
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/cars', carRoutes);
app.use('/api/users', userRoutes);
app.use('/api/contact', contactRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('AutoHaven API is running');
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});