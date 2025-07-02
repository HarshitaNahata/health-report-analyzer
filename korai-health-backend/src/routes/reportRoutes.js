// src/routes/reportRoutes.js
const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const auth = require('../middleware/auth');
const upload = require('../../config/storage');

// Upload a new health report (protected route)
router.post('/upload', auth, upload.single('file'), reportController.uploadReport);

// Get all reports for logged-in user (protected route)
router.get('/my', auth, reportController.getUserReports);

module.exports = router;
