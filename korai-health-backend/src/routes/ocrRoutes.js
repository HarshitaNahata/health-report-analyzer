// src/routes/ocrRoutes.js
const express = require('express');
const multer = require('multer');
const { processReport } = require('../controllers/ocrController');

const router = express.Router();

// Setup multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Route to handle OCR processing
router.post('/process-report', upload.single('file'), processReport);

module.exports = router;
