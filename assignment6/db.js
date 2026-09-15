// db.js
// Task 1: export ONE mysql2 connection pool that every controller shares.
// The database is bookstore_lab5 from the Lab 5 assignment; bookstore_lab5.sql
// (next to this folder) creates and seeds it if you need a fresh copy.
// Shape, from Lab Sheet 06 Section 3:
//   const pool = mysql.createPool({ host, user, password, database, connectionLimit: 10 });
//   module.exports = pool;
const mysql = require('mysql2/promise');

// TODO (Task 1): create the pool with mysql.createPool({ ... }) for
// host 'localhost', user 'root', your MySQL password, database 'bookstore_lab5',
// and export it with module.exports. Until you do, every route answers 500.
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', 
    password: 'Earth-2549',
    database: 'bookstore_lab5',
    connectionLimit: 10
});

module.exports = pool;