const express = require("express");
const router = express.Router();
const transactionsController = require('../controllers/transactionsController');

// post /api/transactions/get-balance
router.post('/get-balance', transactionsController.getBalance);


// POST /api/transactions/buy-stock
router.post('/buy-stock', transactionsController.buyStock);
// POST /api/transactions/sell-stock
router.post('/sell-stock', transactionsController.sellStock);
// POST /api/transactions/add-money
router.post('/add-money', transactionsController.addMoney);
// POST /api/transactions/withdraw-money
router.post('/withdraw-money', transactionsController.withdrawMoney);


// POST /api/transactions/get-investments
router.post('/get-investments', transactionsController.getInvestments);
// POST /api/transactions/get-current-balance
router.post('/get-current-balance', transactionsController.getCurrentBalance);
// POST /api/transactions/get-transactions
router.post('/get-transactions', transactionsController.getTransactions);

module.exports = router;

