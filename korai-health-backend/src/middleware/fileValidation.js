// src/middleware/fileValidation.js
const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];

module.exports = (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    if (!allowedTypes.includes(req.file.mimetype)) {
        return res.status(400).json({ message: 'Invalid file type. Only PDF and image files are allowed.' });
    }
    // Optional: Check file size (e.g., 5MB max)
    if (req.file.size > 5 * 1024 * 1024) {
        return res.status(400).json({ message: 'File too large. Max size is 5MB.' });
    }
    next();
};
