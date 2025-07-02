// src/models/HealthParam.js
const mongoose = require('mongoose');

const healthParamSchema = new mongoose.Schema({
    report: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Report',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    parameter: {
        type: String,
        required: true,
        index: true,
    },
    value: {
        type: Number,
        required: true,
    },
    unit: {
        type: String,
        required: true,
    },
    range: String,
    status: {
        type: String,
        enum: ['Normal', 'Needs Attention'],
        default: 'Normal',
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

// Compound index for trend analysis
healthParamSchema.index({ user: 1, parameter: 1, date: 1 });

module.exports = mongoose.model('HealthParam', healthParamSchema);
