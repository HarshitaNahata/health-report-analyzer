// config/ocr.js

module.exports = {
    provider: process.env.OCR_PROVIDER || 'tesseract', // 'tesseract' or 'google'
    googleApiKey: process.env.GOOGLE_VISION_API_KEY || '', // If using Google Vision
    tesseractLang: 'eng', // Default language for Tesseract
};
