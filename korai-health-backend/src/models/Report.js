// src/models/Report.js
const mongoose = require('mongoose');

const healthParamSchema = new mongoose.Schema({
    parameter: String,
    value: Number,
    unit: String,
    range: String,
    status: String,
}, { _id: false });

const reportSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    filename: {
        type: String,
        required: true,
    },
    parameters: [healthParamSchema],
    uploadedAt: {
        type: Date,
        default: Date.now,
    },
});

// Indexes for faster user-specific queries
reportSchema.index({ user: 1, uploadedAt: -1 });

module.exports = mongoose.model('Report', reportSchema);
