const express = require("express");
const router = express.Router();
const watchlistController = require('../controllers/watchlistController');

// GET /api/watchlist/get-watchlist
router.post('/get-watchlist', watchlistController.getWatchlist);
// GET /api/watchlist/add-to-watchlist
router.post('/add-to-watchlist', watchlistController.addToWatchlist);
// GET /api/watchlist/remove-from-watchlist
router.post('/remove-from-watchlist', watchlistController.removeFromWatchlist);

module.exports = router;

