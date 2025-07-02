// src/controllers/ocrController.js
const tesseract = require('tesseract.js');
const fs = require('fs');

exports.processReport = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

        const imagePath = req.file.path;

        // OCR with Tesseract
        const result = await tesseract.recognize(imagePath, 'eng');
        const text = result.data.text;

        // TODO: parse extracted text into structured data
        res.json({ rawText: text });

        // Clean up
        fs.unlinkSync(imagePath);
    } catch (err) {
        console.error('OCR error:', err);
        res.status(500).json({ message: 'Failed to process report' });
    }
};
