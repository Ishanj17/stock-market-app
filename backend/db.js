require('dotenv').config();

const {Pool} = require("pg");

// create a connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

async function user_accounts() {
  const createUserTableQuery = `
    CREATE TABLE IF NOT EXISTS user_accounts (
      user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(createUserTableQuery);
    console.log('✅ User accounts table created successfully');
  } catch (error) {
    console.error('❌ Error creating user accounts table:', error);
  }
}

async function portfolio() {
  const createPortfolioTableQuery = `
    CREATE TABLE IF NOT EXISTS portfolio (
      portfolio_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES user_accounts(user_id) ON DELETE CASCADE,
      stock_name VARCHAR(100) NOT NULL,
      quantity INTEGER NOT NULL,
      price_per_share DECIMAL(10,4) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, stock_name)
    );
  `;
  try {
    await pool.query(createPortfolioTableQuery);
    console.log('✅ Portfolio table created successfully');
  } catch (error) {
    console.error('❌ Error creating portfolio table:', error);
  }
}

async function watchlist() {
  const createWatchlistTableQuery = `
    CREATE TABLE IF NOT EXISTS watchlist (
      watchlist_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES user_accounts(user_id) ON DELETE CASCADE,
      stock_name VARCHAR(100) NOT NULL,
      added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, stock_name)
    );
  `;
  try {
    await pool.query(createWatchlistTableQuery);
    console.log('✅ Watchlist table created successfully');
  } catch (error) {
    console.error('❌ Error creating watchlist table:', error);
  }
}

async function transactions() {
  const createTransactionsTableQuery = `
    CREATE TABLE IF NOT EXISTS transactions (
      transaction_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES user_accounts(user_id) ON DELETE CASCADE,
      stock_name VARCHAR(100) NOT NULL,
      quantity INTEGER NOT NULL CHECK (quantity > 0),
      price_per_share DECIMAL(10,4) NOT NULL,
      transaction_type VARCHAR(10) NOT NULL CHECK (transaction_type IN ('BUY', 'SELL')),
      transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(createTransactionsTableQuery);
    console.log('✅ Transactions table created successfully');
  } catch (error) {
    console.error('❌ Error creating transactions table:', error);
  }
}

async function balanceDetails() {
  const createBalanceDetailsTableQuery = `
    CREATE TABLE IF NOT EXISTS balance_details (
      balance_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES user_accounts(user_id) ON DELETE CASCADE,
      bank_account_number VARCHAR(30) NOT NULL,
      total_balance DECIMAL(15,2) DEFAULT 10000.00,
      invested_amount DECIMAL(15,2) DEFAULT 0.00,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(createBalanceDetailsTableQuery);
    console.log('✅ Balance details table created successfully');
  } catch (error) {
    console.error('❌ Error creating balance details table:', error);
  }
}

async function initializeDatabase() {
  console.log('🚀 Initializing database tables...');
  await user_accounts();
  await portfolio();
  await watchlist();
  await transactions();
  await balanceDetails();
  console.log('🎉 Database initialization complete!');
}

// test connection
async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('✅ Database connection successful!');
    console.log(`📊 Connected to database: ${process.env.DB_NAME || 'Not specified'}`);
    console.log(`🌐 Host: ${process.env.DB_HOST || 'Not specified'}`);
    console.log(`👤 User: ${process.env.DB_USER || 'Not specified'}`);
    client.release();
    return true;
  } catch (err) {
    console.log('❌ Connection failed:', err.message);
    return false;
  }
}

// Main function for testing
async function main() {
  console.log('🔍 Testing database connection...');
  const isConnected = await testConnection();
  
  if (isConnected) {
    console.log('\n📋 Initializing database tables...');
    await initializeDatabase();
  } else {
    console.log('\n⚠️  Skipping table creation due to connection failure');
  }
}

// Run main function if this file is executed directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  pool, 
  user_accounts, 
  portfolio,
  watchlist, 
  transactions, 
  balanceDetails, 
  initializeDatabase,
  testConnection
};