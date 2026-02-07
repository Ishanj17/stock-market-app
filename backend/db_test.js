require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

async function testConnection() {
  try {
    const client = await pool.connect();
    console.log("✅ Connected to PostgreSQL successfully!");
    
    const result = await client.query('SELECT NOW()');
    console.log("🕒 Server time:", result.rows[0].now);
    
    client.release();
    await pool.end();
  } catch (error) {
    console.error("❌ Connection failed:", error.message);
  }
}

testConnection();
