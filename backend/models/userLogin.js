const pool = require('../db');

async function findUserByEmail(email) {
    const res = await pool.query('SELECT * FROM user_accounts WHERE email = $1', [email]);

    // res.rows is an array of results
    if (res.rows.length === 0) {
        return null;  // return first matched user record
    }
    return res.rows[0];  // no user found
}

async function createUser({ first_name, email, password_hash}) {
    const query = 'INSERT INTO user_accounts (first_name, email, password_hash) VALUES($1, $2, $3)';
    const res = await pool.query(query, [first_name, email, password_hash]);
    if(res.rowCount === 0) {
        return false;
    }
    return true;
}

async function passwordCheck(harshedPassword) {
    const query = 'SELECT password_hash FROM user_accounts WHERE $1 = password_hash';
    const res = await pool.query(query, [harshedPassword]);
    if(res) {
        return true;
    }
    return false;
}

module.exports = { findUserByEmail , createUser, passwordCheck};
