// app.js — mount the books and customers routers.
// Setup: run sql/bookstore_lab9.sql in Workbench, then npm install (once) and node app.js
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const booksRouter = require('./routes/books.routes');
app.use('/books', booksRouter);

const customersRouter = require('./routes/customers.routes');
app.use('/customers', customersRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`Bookstore server on http://localhost:${PORT}`));
