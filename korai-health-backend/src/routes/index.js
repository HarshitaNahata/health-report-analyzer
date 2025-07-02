const express = require('express');
const authRoutes = require('./authRoutes');
const reportRoutes = require('./reportRoutes');
const ocrRoutes = require('./ocrRoutes'); // ✅ Add this line

const router = express.Router();

router.use('/api/auth', authRoutes);
router.use('/api/reports', reportRoutes);
router.use('/api/ocr', ocrRoutes); // ✅ Add this line

module.exports = router;
