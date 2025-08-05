// backend/routes/stocks.js
const express = require('express');
const router = express.Router();
const ipoController = require('../controllers/ipoController');

// GET /api/ipos
router.get('/', ipoController.getIPOs);

module.exports = router;