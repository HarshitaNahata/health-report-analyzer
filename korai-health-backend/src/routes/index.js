// src/routes/index.js
const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const reportRoutes = require('./reportRoutes');

// Prefix all auth routes with /api/auth
router.use('/api/auth', authRoutes);

// Prefix all report routes with /api/reports
router.use('/api/reports', reportRoutes);

module.exports = router;
