// backend/routes/stocks.js
const express = require('express');
const router = express.Router();
const commodityController = require('../controllers/commoditiesController');

// GET /api/commodities
router.get('/', commodityController.getCommodityDetail);

module.exports = router;