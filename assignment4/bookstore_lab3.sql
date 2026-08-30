-- ---------------------------------------------------------------------------
-- CSS326 Laboratory Assignment #4 - the bookstore_lab3 database
--
-- This is the same canonical setup and seed data you were given in Lab 3's
-- assignment. It is repeated here so you are not blocked: if your database is
-- missing, empty, or does not match the column names the assignment uses, open
-- a query tab in MySQL Workbench, paste this whole file, and run it with the
-- lightning bolt.
--
-- Only run it if bookstore_lab3 is missing or empty. On a database that already
-- holds rows it would insert a second copy of everything - see RESET at the
-- bottom if that has happened.
--
-- Expect 10 books, 4 customers, 5 orders and 8 order items.
-- ---------------------------------------------------------------------------

CREATE DATABASE IF NOT EXISTS bookstore_lab3;
USE bookstore_lab3;

-- ---------------------------------------------------------------------------
-- Structure
--
-- customers and books come first: orders points at customers, and order_items
-- points at both orders and books, so the parents must exist before them.
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS customers (
  id    INT AUTO_INCREMENT PRIMARY KEY,
  name  VARCHAR(100) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS books (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  title          VARCHAR(150) NOT NULL,
  author         VARCHAR(100) NOT NULL,
  price          DECIMAL(8,2) NOT NULL,
  stock_quantity INT NOT NULL DEFAULT 0    -- stock_quantity, not stock
);

CREATE TABLE IF NOT EXISTS orders (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT NOT NULL,
  order_date  DATE NOT NULL,
  CONSTRAINT fk_orders_customer FOREIGN KEY (customer_id) REFERENCES customers(id)
);

-- The quantity of a book on an order lives here, not on orders. Task 7's join
-- has to come through this table to reach it.
CREATE TABLE IF NOT EXISTS order_items (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  order_id   INT NOT NULL,
  book_id    INT NOT NULL,
  quantity   INT NOT NULL,
  unit_price DECIMAL(8,2) NOT NULL,
  CONSTRAINT fk_items_order FOREIGN KEY (order_id) REFERENCES orders(id),
  CONSTRAINT fk_items_book  FOREIGN KEY (book_id)  REFERENCES books(id)
);

-- ---------------------------------------------------------------------------
-- Data - the same rows Lab 3's assignment seeded
-- ---------------------------------------------------------------------------

INSERT INTO books (title, author, price, stock_quantity) VALUES
  ('Clean Code','Robert C. Martin',520.00,8),
  ('The Pragmatic Programmer','Andrew Hunt',610.00,5),
  ('Refactoring','Martin Fowler',700.00,3),
  ('Database Internals','Alex Petrov',850.00,4),
  ('SQL in 10 Minutes','Ben Forta',300.00,12),
  ('Designing Data-Intensive Applications','Martin Kleppmann',950.00,6),
  ('Head First SQL','Lynn Beighley',420.00,9),
  ('Learning MySQL','Seyed Tahaghoghi',640.00,2),
  ('Patterns of Enterprise Application Architecture','Martin Fowler',880.00,3),
  ('MySQL Crash Course','Ben Forta',360.00,10);

INSERT INTO customers (name, email) VALUES
  ('Pim','pim@example.com'),('Nate','nate@example.com'),
  ('Som','som@example.com'),('Lek','lek@example.com');

INSERT INTO orders (customer_id, order_date) VALUES
  (1,'2026-08-01'),(2,'2026-08-03'),(3,'2026-08-05'),(4,'2026-08-08'),(1,'2026-08-10');

-- order_id 1..5, book_id 1..10 (from the order above)
INSERT INTO order_items (order_id, book_id, quantity, unit_price) VALUES
  (1,1,1,520.00),(1,5,2,300.00),(2,3,1,700.00),(2,6,1,950.00),
  (3,2,3,610.00),(4,4,1,850.00),(4,7,2,420.00),(5,1,1,480.00);

-- ---------------------------------------------------------------------------
-- Check it worked. Expect 10, 4, 5 and 8.
-- ---------------------------------------------------------------------------

SELECT COUNT(*) AS books_rows       FROM books;
SELECT COUNT(*) AS customers_rows   FROM customers;
SELECT COUNT(*) AS orders_rows      FROM orders;
SELECT COUNT(*) AS order_items_rows FROM order_items;


-- ---------------------------------------------------------------------------
-- RESET (optional) - only if the tables already hold rows and the ids above
-- would not line up. Children before parents, or the foreign keys refuse the
-- drop. Remove the leading -- from these four lines, run them, then run this
-- file again from the top.
-- ---------------------------------------------------------------------------
-- DROP TABLE IF EXISTS order_items;
-- DROP TABLE IF EXISTS orders;
-- DROP TABLE IF EXISTS books;
-- DROP TABLE IF EXISTS customers;
