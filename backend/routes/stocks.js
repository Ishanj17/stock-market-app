const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

// GET /api/stocks/detail
router.get('/detail', stockController.getStockDetail);
// GET /api/stocks/trending 
router.get('/trending', stockController.getTrendingStock);
// GET /api/stocks/price_shockers 
router.get('/price-shockers', stockController.getPriceShockers );
// GET /api/stocks/BSE-most-active 
router.get('/BSE-most-active', stockController.getBSEMostActive);
// GET /api/stocks/NSE-most-active 
router.get('/NSE-most-active', stockController.getNSEMostActive);
// GET /api/stocks/fetch_52_week_high_low_data 
router.get('/fetch-52-week-high-low-data', stockController.get52WeekHighLowData);

module.exports = router;