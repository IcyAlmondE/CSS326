// app.js — mount the books, customers and orders routers, serve the front-end.
// Setup: run bookstore_lab8.sql in Workbench, then npm install (once) and node app.js
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const booksRouter = require('./routes/books.routes');
app.use('/books', booksRouter);

const customersRouter = require('./routes/customers.routes');
app.use('/customers', customersRouter);

const ordersRouter = require('./routes/orders.routes');
app.use('/orders', ordersRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


// Task 8
// Using view makes the JOIN table reusable, not having to join again every time, which will reduce errors and
// when there's any change in table structure, the change will be applied for all JOIN tables.
// Example of subquery question: find all customers in the database that hasn't ordered any books yet.

