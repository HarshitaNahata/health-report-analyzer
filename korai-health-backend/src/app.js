require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('../config/database');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Connect to DB
connectDB();

// ✅ CORS middleware (important: place before routes)
app.use(cors({
    origin: 'http://localhost:5174', // Your React frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Parse JSON
app.use(express.json());

// 🧠 Handle preflight OPTIONS
app.options('*', cors());

// Routes
const reportRoutes = require('./routes/reportRoutes');
const authRoutes = require('./routes/authRoutes');
const ocrRoutes = require('./routes/ocrRoutes');

app.use('/api/reports', reportRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/ocr', ocrRoutes);

// Error handler
app.use(errorHandler);

module.exports = app;
