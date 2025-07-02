// src/services/ocr/googleVision.js
const vision = require('@google-cloud/vision');
const ocrConfig = require('../../../config/ocr');

// Make sure GOOGLE_APPLICATION_CREDENTIALS env var is set for authentication
const client = new vision.ImageAnnotatorClient();

exports.extractText = async (filePath) => {
    try {
        const [result] = await client.textDetection(filePath);
        const detections = result.textAnnotations;
        return detections.length > 0 ? detections[0].description : '';
    } catch (err) {
        throw new Error('Google Vision OCR failed: ' + err.message);
    }
};
