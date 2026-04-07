const mongoose = require('mongoose');

const AlertSchema = new mongoose.Schema({
    location: {
        lat: Number,
        lng: Number,
    },
    riskLevel: {
        type: String,
        default: 'High',
    },
    situation: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Alert', AlertSchema);
