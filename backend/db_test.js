const { Client } = require('pg');

const client = new Client({
  host: '192.168.93.54', // change if needed
  port: 5432,
  user: 'postgres', // change
  password: 'postgres', // change
  database: 'crash', // change
  connectionTimeoutMillis: 5000 // 5 seconds timeout
});

(async () => {
  try {
    await client.connect();
    console.log("✅ Connected to PostgreSQL successfully!");
    const res = await client.query('SELECT NOW() AS current_time');
    console.log("Server time:", res.rows[0].current_time);
  } catch (err) {
    console.error("❌ Connection failed:", err.message);
  } finally {
    await client.end();
  }
})();
