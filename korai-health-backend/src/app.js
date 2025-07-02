// src/app.js
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('../config/database');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Routes
app.use(routes);

// Error handling middleware (must be last)
app.use(errorHandler);

module.exports = app;
