// CSS326 Lab 5 Assignment -- starter file
// Schema (bookstore_lab5.sql):
//   books( id, title, author, price, stock )
//   customers( id, name, email )
//   orders( id, customer_id, book_id, quantity )
//
// Run:  npm install
//       node app.js
//       open http://localhost:3000

const express = require('express');
const mysql = require('mysql2/promise');
const app = express();

app.use(express.json());
app.use(express.static('public'));  // Task 8
// Note: once public/index.html exists, express.static answers GET / with that
// page, so Task 1's welcome message is no longer what the root returns. Take
// Task 1's screenshot before you add the page in Task 8.

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Earth-2549',
  database: 'bookstore_lab5'
};

// ---------------------------------------------------------------------
// Task 1: Set up Express -- GET / welcome route
// ---------------------------------------------------------------------
app.get('/', (req, res) => {
  // TODO
  res.send("Welcome to Assignment 5");
});

// ---------------------------------------------------------------------
// Task 2: List books -- GET /books
// ---------------------------------------------------------------------
app.get('/books', async (req, res) => {
  // TODO (also handles Task 4's optional ?author=... filter)
  const conn = await mysql.createConnection(dbConfig);
  try{
    const author = req.query.author;
    if(author){
      // Task 4
      const [rows3] = await conn.execute('SELECT * FROM books WHERE author = ?', [req.query.author]);
      res.json(rows3);
    } else{
      const [rows1] = await conn.execute('SELECT * FROM books');
      res.json(rows1);
    }
  } catch(err){
    console.log(err);
  } finally{
    conn.end();
  }
});

// ---------------------------------------------------------------------
// Task 3: One book by id -- GET /books/:id
// ---------------------------------------------------------------------
app.get('/books/:id', async (req, res) => {
  // TODO
  const conn = await mysql.createConnection(dbConfig);
  try{
    const [rows2] = await conn.execute('SELECT * FROM books WHERE id = ?', [req.params.id]);
    if(rows2.length===0) return res.status(404).json({error: 'not found'});
    res.json(rows2[0]);
  } catch(err){
    res.status(500).json({error: err.message});
  } finally{
    conn.end();
  }
});

// ---------------------------------------------------------------------
// Task 5: Create a book -- POST /books
// ---------------------------------------------------------------------
app.post('/books', async (req, res) => {
  // TODO
  const conn = await mysql.createConnection(dbConfig);
  try{
    const {title, author, price, stock} = req.body;
    const [rows4] = await conn.execute('INSERT INTO books (title, author, price, stock) VALUES (?, ?, ?, ?)', [title, author, price, stock]);
    res.status(201).json({id: rows4.insertId});
  } catch(err){
    res.status(500).json({error: err.message});
  } finally{
    conn.end();
  }
});

// ---------------------------------------------------------------------
// Task 6: Join from the API -- GET /orders/details
// ---------------------------------------------------------------------
app.get('/orders/details', async (req, res) => {
  // TODO
  const conn = await mysql.createConnection(dbConfig);
  try{
    const [rows5] = await conn.execute('SELECT c.name, b.title, o.quantity FROM orders o INNER JOIN books b ON o.book_id = b.id INNER JOIN customers c ON o.customer_id = c.id');
    res.json(rows5);
  } catch(err){
    res.status(500).json({error: err.message});
  } finally{
    conn.end();
  }
});

// Route handlers need an error handling because when the routing fails, 
// the user knows it is failed, not the data is empty.

app.listen(3000, () => console.log('http://localhost:3000'));
