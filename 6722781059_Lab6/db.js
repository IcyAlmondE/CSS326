// db.js
// This is done for you -- Exercise 1 asks you to *use* this shared pool
// everywhere, not to write it from scratch.
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Earth-2549',   // <-- change this to your MySQL password
  database: 'university',
  connectionLimit: 10
});

module.exports = pool;
