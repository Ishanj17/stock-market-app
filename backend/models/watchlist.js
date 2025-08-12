const {pool} = require('../db');

const getWatchlistedStock = async (user_id) => {
    const query = `SELECT * FROM watchlist WHERE user_id = $1`;
    const result = await pool.query(query, [user_id]);
    return result.rows;
}

const addStockToWatchlist = async (user_id, stock_name) => {
    const query = `INSERT INTO watchlist (user_id, stock_name) VALUES ($1, $2)`;
    const result = await pool.query(query, [user_id, stock_name]);
    return result.rowCount;
}

const removeStockFromWatchlist = async (user_id, stock_name) => {
    const query = `DELETE FROM watchlist WHERE user_id = $1 AND stock_name = $2`;
    const result = await pool.query(query, [user_id, stock_name]);
    return result.rowCount;
}

const checkWatchlistStatus = async (user_id, stock_name) => {
    const query = `SELECT * FROM watchlist WHERE user_id = $1 AND stock_name = $2`;
    const result = await pool.query(query, [user_id, stock_name]);
    return result.rows;
}
    
module.exports = { getWatchlistedStock, addStockToWatchlist, removeStockFromWatchlist, checkWatchlistStatus };