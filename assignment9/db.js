// db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Earth-2549',
  database: 'bookstore_lab9',
  connectionLimit: 10
});

module.exports = pool;
