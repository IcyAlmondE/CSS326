# CSS326 Lab Assignment 11 – Routines, Triggers & JSON (bookstore starter)

## 1. Set up the database (MySQL Workbench, as root)
Execute `sql/bookstore_lab11.sql`. It creates a fresh, separate `bookstore_lab11` database (the same tables and rows as `bookstore_lab10`, without the bulk file: 8 books, 4 customers, 5 orders). Running it again resets everything, including your procedure, function and triggers.

```
books(id, title, author, price, stock)
customers(id, name, email)
orders(id, customer_id, book_id, quantity)    -- FKs to customers and books
```
Q1–Q4 are done in Workbench with `sql/q1_q4_routines.sql`; Q6–Q7 (SQL part) with
`sql/q6_q7_json.sql`. Keep the `DELIMITER //` lines around routines and triggers.
In Q3 one `CALL` is meant to fail (Error 1644), and Workbench stops the script there:
select the lines below it and run them separately.

The last lines of the setup file also make sure the `bookstore_app` user exists and give it
SELECT, INSERT, UPDATE and DELETE on `bookstore_lab11`, plus **EXECUTE**, which is new in Lab 11:
the app now calls your procedure and function, and without EXECUTE MySQL answers
"execute command denied".

If the setup file stops at its `CREATE USER` line with ERROR 1819, your MySQL enforces a password policy: replace `a_strong_password` in that line with a longer password with upper and lower case, a digit and a symbol (a `#` starts a comment in `.env`, so avoid it or put the password in quotes there), run the file again, and put the same password in `DB_PASS`. If `bookstore_app` already exists from Lab 10, use its own password in that line (an existing user keeps its password, and the file stops before the `GRANT`, so the app is refused with "SELECT command denied" until it runs through).

## 2. Run the web app
Copy `.env.example` to `.env` and put the password of your Lab 10 `bookstore_app` user in `DB_PASS`
(if you never created that user, the setup file did it, with the password `a_strong_password`).
Then:
```bash
npm install
npm run dev                 # http://localhost:3000
```
`db.js` reads its settings from `.env`; restart the server after you edit `.env`.
Open **http://localhost:3000**: books with stock (and, after Q7, format / pages and a
format filter), customers with their order count, a Place/Cancel order panel, and a log of
every response. After each order or cancel the log shows how the stock changed.

| Method | Route | Question |
|---|---|---|
| GET | `/books`, `/books?format=ebook` | Q7 – read / filter the JSON column |
| GET | `/books/:id`, `/books/search?author=Ben%20Forta` | done in Lab 10 |
| GET | `/customers` | Q5 – add `order_count(id)` |
| GET | `/customers/:id/orders` | done for you |
| POST | `/customers/:id/orders` body `{"book_id":1,"quantity":2}` | Q5 – `CALL place_order(?, ?, ?)` |
| DELETE | `/customers/:id/orders/:orderId` | Q5 – just the DELETE (the trigger restores stock) |

The order routes in `controllers/customers.controller.js` are your Lab 9 transactions. They
work, but once your Q3/Q4 triggers exist they change the stock **twice** – Q5 fixes that.
`requests.http` contains ready-made test requests.

## 3. Submit
Your project folder (zip it, **without** `node_modules` and without `.env`), your two SQL files, and one PDF
with your screenshots and short answers.
