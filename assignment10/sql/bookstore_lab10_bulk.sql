-- bookstore_lab10_bulk.sql
-- CSS326 Lab Assignment 10: adds 50,000 books, 5,000 customers and 100,000 orders,
-- so that full table scans become slow enough to measure. Run after bookstore_lab10.sql.
-- Takes a few seconds. Run it ONCE: to start again, run bookstore_lab10.sql first,
-- which resets the database (a second run of this file stops with a duplicate-email
-- error, because every customer's email must be unique).
USE bookstore_lab10;

SET SESSION cte_max_recursion_depth = 100000;

INSERT INTO customers (name, email)
WITH RECURSIVE n AS (SELECT 1 AS i UNION ALL SELECT i + 1 FROM n WHERE i < 5000)
SELECT CONCAT('Customer ', i), CONCAT('customer', i, '@example.com') FROM n;

INSERT INTO books (title, author, price, stock)
WITH RECURSIVE n AS (SELECT 1 AS i UNION ALL SELECT i + 1 FROM n WHERE i < 50000)
SELECT CONCAT('Book ', i), CONCAT('Author ', 1 + i % 2000), 100 + i % 900, i % 50 FROM n;

INSERT INTO orders (customer_id, book_id, quantity)
WITH RECURSIVE n AS (SELECT 1 AS i UNION ALL SELECT i + 1 FROM n WHERE i < 100000)
SELECT 1 + i % 5004, 1 + i % 50008, 1 + i % 3 FROM n;

SELECT (SELECT COUNT(*) FROM books)     AS books,      -- expect 50008
       (SELECT COUNT(*) FROM customers) AS customers,  -- expect 5004
       (SELECT COUNT(*) FROM orders)    AS orders;     -- expect 100005
