// index.js
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config(); 

// Import Routes
const stockRoutes = require('./routes/stocks');
const commoditiesRoutes = require('./routes/commodities');
const mfRoutes = require('./routes/mutualFunds');
const ipoRoutes = require('./routes/ipos');
const newsRoutes = require('./routes/news');
const userRoutes = require('./routes/user');
const watchlistRoutes = require('./routes/watchlist');
const transactionsRoutes = require('./routes/transactions');

app.use(cors());
app.use(express.json());

// Use Routes
app.use('/api/stocks', stockRoutes);
app.use('/api/commodities', commoditiesRoutes);
app.use('/api/mutualfunds', mfRoutes);
app.use('/api/ipos', ipoRoutes);
app.use('/api/news', newsRoutes);
// internal calls
app.use('/api/user',userRoutes);
app.use('/api/watchlist',watchlistRoutes);
app.use('/api/transactions',transactionsRoutes);

const PORT = 5000;
app.listen(PORT,'0.0.0.0', () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
