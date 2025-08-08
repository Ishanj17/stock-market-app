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

// test connection
pool.connect()
    .then(client => {
        client.release();
    })
    .catch(err => console.log('connecton failed', err.stack));


module.exports = pool;