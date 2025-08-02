require('dotenv').config();

const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbconnection');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use(errorHandler);

// ✅ Connect to DB AND wait, THEN start server
const startServer = async () => {
  try {
    await connectDb(); // ✅ Wait for DB connection

    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1); // Exit if DB connection or server fails
  }
};

startServer(); 