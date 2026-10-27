-- CSS326 -- bookstore_lab10 schema, seeded for the Lab 10 assignment
-- Same tables and rows as bookstore_lab9:
--   books( id, title, author, price, stock )
--   customers( id, name, email )
--   orders( id, customer_id, book_id, quantity )   -- FKs to customers and books
-- orders also carries CHECK (quantity > 0), so a zero or negative quantity is
-- rejected by the database itself. The foreign keys matter here too: an order
-- that points to a customer or book that does not exist is REJECTED.
-- Seed = bookstore_lab9's rows (6 books, 4 customers, 5 orders) plus two books by
-- Ben Forta, the author the assignment searches for: 8 books, 4 customers, 5 orders.
-- bookstore_lab10_bulk.sql then adds 50,000 books, 5,000 customers and 100,000
-- orders: 50,008 books, 5,004 customers and 100,005 orders in all.
--
-- A fresh schema for the Lab 10 assignment, named for the lab that owns it.
-- It does not replace bookstore_lab9. Running this file again resets everything
-- (including any index or table you added), so run bookstore_lab10_bulk.sql once,
-- right after it.

CREATE DATABASE IF NOT EXISTS bookstore_lab10;
USE bookstore_lab10;

DROP VIEW  IF EXISTS order_details;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS customers;

CREATE TABLE books (
  id     INT AUTO_INCREMENT PRIMARY KEY,
  title  VARCHAR(200) NOT NULL,
  author VARCHAR(150) NOT NULL,
  price  DECIMAL(8,2) NOT NULL,
  stock  INT NOT NULL DEFAULT 0
);

CREATE TABLE customers (
  id    INT AUTO_INCREMENT PRIMARY KEY,
  name  VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE
);

CREATE TABLE orders (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT NOT NULL,
  book_id     INT NOT NULL,
  quantity    INT NOT NULL DEFAULT 1,
  FOREIGN KEY (customer_id) REFERENCES customers(id),
  FOREIGN KEY (book_id)     REFERENCES books(id),
  CONSTRAINT chk_orders_qty CHECK (quantity > 0)
);

INSERT INTO books (title, author, price, stock) VALUES
  ('Clean Code',                 'Robert C. Martin', 950.00, 12),
  ('The Pragmatic Programmer',   'Andrew Hunt',       890.00, 8),
  ('Database System Concepts',   'Abraham Silberschatz', 1200.00, 5),
  ('Designing Data-Intensive Applications', 'Martin Kleppmann', 1500.00, 6),
  ('Introduction to Algorithms', 'Thomas H. Cormen',  1650.00, 4),
  ('Refactoring',                'Martin Fowler',     1350.00, 7);

INSERT INTO customers (name, email) VALUES
  ('Pim Suwannarat', 'pim.s@example.com'),
  ('Nat Chaiyaporn', 'nat.c@example.com'),
  ('Ploy Rattanakorn', 'ploy.r@example.com'),
  ('Mek Thongdee', 'mek.t@example.com');

INSERT INTO orders (customer_id, book_id, quantity) VALUES
  (1, 1, 1),
  (1, 3, 2),
  (2, 2, 1),
  (3, 4, 1),
  (3, 5, 3);

-- Added for Lab 10 (the Lab 9 rows above are unchanged): the assignment searches
-- the author 'Ben Forta', who has exactly two books here.
INSERT INTO books (title, author, price, stock) VALUES
  ('SQL in 10 Minutes',          'Ben Forta',         590.00, 12),
  ('MySQL Crash Course',         'Ben Forta',         650.00, 8);
