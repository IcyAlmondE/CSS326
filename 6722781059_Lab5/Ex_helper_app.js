// CSS326 Lab 5 -- starter file for Exercises 1-4
// Run:  npm install   (once)
//       node app.js
//       open http://localhost:3000

const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
app.use(express.json());            // Exercise 3: lets Express read JSON bodies
app.use(express.static('public'));  // Exercise 4: serves public/index.html
// Note: once public/index.html exists, express.static answers GET / with that
// page, so the Exercise 1 welcome route below no longer shows at the root.
// That is middleware order doing exactly what section 9 describes, and it is
// the end state you want - the site at /, the API at its own routes.

// Fill in your own values -- this is the `lab_5` schema, from lab_5.sql.
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'lab_5'
};

// ---------------------------------------------------------------------
// Exercise 1: Your first server
// ---------------------------------------------------------------------
app.get('/', (req, res) => {
  // TODO: send a welcome message
});

app.get('/data', (req, res) => {
  // TODO: res.json(...) a small object, e.g. { course: 'CSS326', year: 3 }
});

// ---------------------------------------------------------------------
// Exercise 2: Read from the database
// ---------------------------------------------------------------------
app.get('/students', async (req, res) => {
  // TODO: connect, SELECT * FROM students, res.json(rows)
});

app.get('/students/:id', async (req, res) => {
  // TODO: SELECT * FROM students WHERE id = ? using req.params.id
  // TODO: return 404 if no row is found
});

// ---------------------------------------------------------------------
// Exercise 3: Create with POST
// ---------------------------------------------------------------------
app.post('/students', async (req, res) => {
  // TODO: destructure { name, major, year } from req.body
  // TODO: INSERT INTO students (...) VALUES (?, ?, ?)
  // TODO: res.status(201).json({ id: ... })
});

app.listen(3000, () => console.log('http://localhost:3000'));
