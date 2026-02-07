const { pool } = require('../db');

// ---------------- BALANCE ---------------- //

const checkBalance = async (user_id) => {
  const result = await pool.query(
    `SELECT * FROM balance_details WHERE user_id = $1`,
    [user_id]
  );
  return result.rows;
};

const updateBalance = async (user_id, amount, type) => {
  let query = '';

  if (type === 'BUY') {
    query = `
      UPDATE balance_details
      SET total_balance = total_balance - $1,
          invested_amount = invested_amount + $1,
          updated_at = CURRENT_TIMESTAMP
      WHERE user_id = $2
    `;
  } else if (type === 'SELL') {
    query = `
      UPDATE balance_details
      SET total_balance = total_balance + $1,
          invested_amount = invested_amount - $1,
          updated_at = CURRENT_TIMESTAMP
      WHERE user_id = $2
    `;
  }

  const result = await pool.query(query, [amount, user_id]);
  return result.rowCount;
};

const addWithdrawBalance = async (user_id, amount, type) => {
  let query = '';

  if (type === 'ADD') {
    query = `
      UPDATE balance_details
      SET total_balance = total_balance + $1,
          updated_at = CURRENT_TIMESTAMP
      WHERE user_id = $2
    `;
  } else if (type === 'WITHDRAW') {
    query = `
      UPDATE balance_details
      SET total_balance = total_balance - $1,
          updated_at = CURRENT_TIMESTAMP
      WHERE user_id = $2
    `;
  }

  const result = await pool.query(query, [amount, user_id]);
  return result.rowCount;
};

// ---------------- PORTFOLIO ---------------- //

const checkStockInPortfolio = async (user_id, stock_name) => {
  const result = await pool.query(
    `SELECT * FROM portfolio 
     WHERE user_id = $1 AND stock_name = $2`,
    [user_id, stock_name]
  );
  return result.rows;
};

const addStockToPortfolio = async (user_id, stock_name, quantity, price) => {
  const result = await pool.query(
    `INSERT INTO portfolio 
     (user_id, stock_name, quantity, price_per_share) 
     VALUES ($1, $2, $3, $4)`,
    [user_id, stock_name, quantity, price]
  );
  return result.rowCount;
};

const updatePortfolio = async (user_id, stock_name, quantity, price, type) => {
  let result;

  if (type === 'BUY') {
    // weighted average price formula
    result = await pool.query(
      `UPDATE portfolio
       SET quantity = quantity + $1,
           price_per_share = 
             ((quantity * price_per_share) + ($1 * $2)) 
             / (quantity + $1)
       WHERE user_id = $3 AND stock_name = $4
       RETURNING *`,
      [quantity, price, user_id, stock_name]
    );
  } 
  
  else if (type === 'SELL') {
    result = await pool.query(
      `UPDATE portfolio
       SET quantity = quantity - $1
       WHERE user_id = $2 AND stock_name = $3
       RETURNING *`,
      [quantity, user_id, stock_name]
    );
  }

  return result.rowCount;
};

// ---------------- TRANSACTIONS ---------------- //

const updateTransactions = async (user_id, stock_name, quantity, price, type) => {
  const result = await pool.query(
    `INSERT INTO transactions
     (user_id, stock_name, quantity, price_per_share, transaction_type)
     VALUES ($1, $2, $3, $4, $5)`,
    [user_id, stock_name, quantity, price, type]
  );
  return result.rowCount;
};

// ---------------- FETCH DATA ---------------- //

const getInvestments = async (user_id) => {
  const result = await pool.query(
    `SELECT *,
     (quantity * price_per_share) AS invested_amount
     FROM portfolio
     WHERE user_id = $1`,
    [user_id]
  );
  return result.rows;
};

const getCurrentBalance = async (user_id) => {
  const result = await pool.query(
    `SELECT * FROM balance_details WHERE user_id = $1`,
    [user_id]
  );
  return result.rows;
};

const getTransactions = async (user_id) => {
  const result = await pool.query(
    `SELECT * FROM transactions 
     WHERE user_id = $1
     ORDER BY transaction_date DESC`,
    [user_id]
  );
  return result.rows;
};

const addBankAccount = async (user_id, account_number) => {
  const result = await pool.query(
    `INSERT INTO balance_details 
     (user_id, bank_account_number, total_balance, invested_amount)
     VALUES ($1, $2, 1000, 0)`,
    [user_id, account_number]
  );
  return result.rowCount;
};

module.exports = {
  checkBalance,
  addStockToPortfolio,
  updateBalance,
  updateTransactions,
  checkStockInPortfolio,
  updatePortfolio,
  addWithdrawBalance,
  getInvestments,
  getCurrentBalance,
  getTransactions,
  addBankAccount
};
