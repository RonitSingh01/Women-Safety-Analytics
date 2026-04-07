const express = require('express');
const router = express.Router();
const Alert = require('../models/Alert');

// @route   POST /api/alert
// @desc    Trigger an SOS alert
router.post('/', async (req, res) => {
    try {
        const { location, situation, riskLevel } = req.body;
        
        const newAlert = new Alert({
            location,
            situation,
            riskLevel: riskLevel || 'High'
        });

        const alert = await newAlert.save();
        res.json({ success: true, message: 'SOS Alert triggered and saved', data: alert });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/alert
// @desc    Get recent alerts
router.get('/', async (req, res) => {
    try {
        const alerts = await Alert.find().sort({ timestamp: -1 }).limit(10);
        res.json(alerts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
