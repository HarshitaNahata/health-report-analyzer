// src/services/ocr/tesseract.js
const { createWorker } = require('tesseract.js');
const ocrConfig = require('../../../config/ocr');

exports.extractText = async (filePath) => {
    const worker = await createWorker(ocrConfig.tesseractLang || 'eng');
    try {
        const { data } = await worker.recognize(filePath);
        await worker.terminate();
        return data.text;
    } catch (err) {
        await worker.terminate();
        throw new Error('Tesseract OCR failed: ' + err.message);
    }
};
