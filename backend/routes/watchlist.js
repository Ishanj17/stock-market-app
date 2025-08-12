const express = require("express");
const router = express.Router();
const watchlistController = require('../controllers/watchlistController');

// GET /api/watchlist/get-watchlist
router.post('/get-watchlist', watchlistController.getWatchlist);
// POST /api/watchlist/add-to-watchlist
router.post('/add-to-watchlist', watchlistController.addToWatchlist);
// POST /api/watchlist/remove-from-watchlist
router.post('/remove-from-watchlist', watchlistController.removeFromWatchlist);
// POST /api/watchlist/check-watchlist-status
router.post('/check-watchlist-status', watchlistController.checkWatchlistStatus);


module.exports = router;

