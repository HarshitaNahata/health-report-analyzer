// config/storage.js
const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Unique filename: timestamp-originalname
        cb(null, Date.now() + '-' + file.originalname);
    },
});

// File filter: only accept PDFs and images
function fileFilter(req, file, cb) {
    const allowedExts = ['.pdf', '.jpg', '.jpeg', '.png'];
    const allowedMimes = [
        'application/pdf',
        'image/jpeg',
        'image/png'
    ];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedExts.includes(ext) && allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only PDF and image files are allowed!'), false);
    }
}


const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
});

module.exports = upload;
