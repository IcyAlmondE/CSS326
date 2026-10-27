// db.js
// Lab 10 Q6, Q7: settings from .env; connect as the least-privilege bookstore_app.
require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: 10
});

module.exports = pool;
