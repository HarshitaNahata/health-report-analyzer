// src/utils/storage.js
const fs = require('fs');
const path = require('path');

/**
 * Deletes a file at the given path.
 * @param {string} filePath
 * @returns {boolean}
 */
exports.deleteFile = (filePath) => {
    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            return true;
        }
        return false;
    } catch (err) {
        return false;
    }
};
