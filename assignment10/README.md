# CSS326 Lab Assignment 10 – Hardening: Performance & Security (bookstore starter)

## 1. Set up the database (MySQL Workbench, as root)
Execute `sql/bookstore_lab10.sql`, then `sql/bookstore_lab10_bulk.sql` (once). The first creates a separate `bookstore_lab10` database (the same tables and rows as `bookstore_lab9`, plus two books by Ben Forta); the second adds 50,000 books, 5,000 customers and 100,000 orders, so that full table scans become slow enough to measure. The bulk file takes a few seconds. In all: 50,008 books, 5,004 customers and 100,005 orders.

```
books(id, title, author, price, stock)
customers(id, name, email)
orders(id, customer_id, book_id, quantity)    -- FKs to customers and books
```

## 2. Run the API
```bash
npm install
npm run dev                 # http://localhost:3000
```
In `db.js`, put your own root password in place of `your_password` (for now). Then open http://localhost:3000 for the search page. After editing `.env` (Q7), stop the server (Ctrl + C) and start `npm run dev` again: it does not restart on `.env` changes.

| Method | Route | Question |
|---|---|---|
| GET | `/books` | the first 20 books |
| GET | `/books/:id` | one book |
| GET | `/books/search?author=Ben%20Forta` | Q5 |
| GET | `/customers/:id/orders` | list a customer's orders (e.g. customer 42's) |
| POST | `/customers/:id/orders` body `{"book_id":1,"quantity":2}` | Lab 9 route: use it to check the app still works (Q6) |
| DELETE | `/customers/:id/orders/:orderId` | Lab 9 route: the same |

## Your tasks
Follow the assignment sheet. The `TODO` comments mark where Q5, Q6 and Q7 change the code.
Put your SQL answers in `sql/assignment10_starter.sql` (one section per question).
`requests.http` contains ready-made test requests.

## 3. Submit
Follow the Submission section of the assignment sheet: zip the project **without** `node_modules` and **without** your `.env` (keep `.env.example`), with your completed `sql/assignment10_starter.sql` and one PDF of screenshots. Due before the start of Lab 11 (30th of October 2026).
