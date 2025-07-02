const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse'); // Make sure to run: npm install pdf-parse
const ocrConfig = require('../../config/ocr');
const tesseractService = require('../services/ocr/tesseract');
const googleVisionService = require('../services/ocr/googleVision');
const reportService = require('../services/reportService');
const aiService = require('../services/aiService');
const Report = require('../models/Report');

// Upload and process a health report
exports.uploadReport = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

        const ext = path.extname(req.file.filename).toLowerCase();

        let extractedText = '';

        if (ext === '.pdf') {
            // Read PDF file buffer
            const dataBuffer = fs.readFileSync(req.file.path);
            const pdfData = await pdfParse(dataBuffer);
            extractedText = pdfData.text;
        } else {
            // OCR extraction
            if (ocrConfig.provider === 'google') {
                extractedText = await googleVisionService.extractText(req.file.path);
            } else {
                extractedText = await tesseractService.extractText(req.file.path);
            }
        }

        // Parse health data
        const healthParams = reportService.parseHealthData(extractedText);

        // AI insights: flag abnormal values
        const analyzedParams = aiService.flagAbnormalValues(healthParams);

        // Save report to DB (optional)
        const report = await Report.create({
            user: req.user ? req.user._id : null,
            filename: req.file.filename,
            parameters: analyzedParams,
            uploadedAt: new Date(),
        });

        res.json({
            message: 'Report processed successfully',
            data: analyzedParams,
            reportId: report._id,
        });
    } catch (err) {
        res.status(500).json({ message: 'Report processing failed', error: err.message });
    }
};

// Fetch user-specific reports
exports.getUserReports = async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId) return res.status(401).json({ message: 'Unauthorized' });

        const reports = await Report.find({ user: userId }).sort({ uploadedAt: -1 });

        res.json({ reports });
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch reports', error: err.message });
    }
};
