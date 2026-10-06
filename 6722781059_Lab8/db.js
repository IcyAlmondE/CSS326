// db.js — shared mysql2 pool (same as Lab 6).
const mysql = require('mysql2/promise');
const pool = mysql.createPool({
  host: 'localhost', user: 'root',
  password: 'Earth-2549', database: 'lab_8',
  connectionLimit: 10
});
module.exports = pool;
