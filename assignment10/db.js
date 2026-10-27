// db.js
// TODO (Assignment Q6, Q7): connect as bookstore_app, and read these settings
// from a .env file with process.env instead of typing them here.
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,   // <-- a password typed into the code
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});