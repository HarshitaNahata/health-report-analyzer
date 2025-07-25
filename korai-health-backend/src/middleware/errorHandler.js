// src/middleware/errorHandler.js
module.exports = (err, req, res, next) => {
    console.error(err.stack || err);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        error: process.env.NODE_ENV === 'production' ? undefined : err.stack,
    });
};
