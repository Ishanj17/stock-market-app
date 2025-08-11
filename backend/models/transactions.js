const { pool } = require('../db');

const checkBalance = async (user_id) => {
    const query = `SELECT * FROM balance_details WHERE user_id = $1`;
    const result = await pool.query(query, [user_id]);
    console.log(result, 'result');
    return result.rows || [];
}

const addStockToPortfolio = async (user_id, stock_name, quantity, price) => {
    const query = `INSERT INTO portfolio (user_id, stock_name, quantity, price_per_share) VALUES ($1, $2, $3, $4)`;
    const result = await pool.query(query, [user_id, stock_name, quantity, price]);
    console.log(result, 'result');
    return result.rowCount;
}

const updateBalance = async (user_id, amount, type) => {
    let query = '';
    if(type === 'BUY') {
        query = `UPDATE balance_details
            SET total_balance = total_balance - $1,
                invested_amount = invested_amount + $1
            WHERE user_id = $2`;
    } else if(type === 'SELL') {
        query = `UPDATE balance_details
            SET total_balance = total_balance + $1,
                invested_amount = invested_amount - $1
            WHERE user_id = $2`;
    }
    const result = await pool.query(query, [amount, user_id]);
    console.log(result, 'result');
    return result.rowCount;
}

const updateTransactions = async (user_id, stock_name, quantity, price, type) => {
    const query = `INSERT INTO transactions (user_id, stock_name, quantity, price_per_share, transaction_type) VALUES ($1, $2, $3, $4, $5)`;
    const result = await pool.query(query, [user_id, stock_name, quantity, price, type]);
    console.log(result, 'result');
    return result.rowCount;
}

const checkStockInPortfolio = async (user_id, stock_name) => {
    const query = `SELECT * FROM portfolio WHERE user_id = $1 AND stock_name = $2`;
    const result = await pool.query(query, [user_id, stock_name]);
    console.log(result, 'result');
    return result.rows;
}

const updatePortfolio = async (user_id, stock_name, quantity, price, type) => {
    let query = '';
    let result = [];
    if(type === 'BUY') {
        query = `UPDATE portfolio
        SET quantity = quantity + $1,
        price_per_share = ((quantity * price_per_share) + ($1 * $2)) / (quantity + $1) 
        WHERE user_id = $3 AND stock_name = $4
        RETURNING *`;
        result = await pool.query(query, [quantity, price, user_id, stock_name]);
    } else if(type === 'SELL') {
        query = `UPDATE portfolio
        SET quantity = quantity - $1 
        WHERE user_id = $2 AND stock_name = $3
        RETURNING *`;
        result = await pool.query(query, [quantity, user_id, stock_name]);
    }
    console.log(result, 'result');
    return result.rowCount;
}

module.exports = { checkBalance, addStockToPortfolio, updateBalance, updateTransactions, checkStockInPortfolio, updatePortfolio };