require('dotenv').config(); // 👈 make sure this is first

const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbconnection');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use(errorHandler);

// DB connection
connectDb();

// Server start
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
