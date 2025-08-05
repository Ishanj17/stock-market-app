// backend/routes/stocks.js
const express = require('express');
const router = express.Router();
const mfController = require('../controllers/mfController');

// GET /api/mutualfunds
router.get('/', mfController.getMFs);
// GET /api/mutualfunds/details
router.get('/details', mfController.getMFDetails);


module.exports = router;