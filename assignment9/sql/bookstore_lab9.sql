-- CSS326 -- bookstore_lab9 schema, seeded for the Lab 9 assignment
-- Same tables and rows as bookstore_lab8:
--   books( id, title, author, price, stock )
--   customers( id, name, email )
--   orders( id, customer_id, book_id, quantity )   -- FKs to customers and books
-- orders also carries CHECK (quantity > 0), so a zero or negative quantity is
-- rejected by the database itself. The foreign keys matter for Q4: an order
-- that points to a customer or book that does not exist is REJECTED too.
-- Seed = bookstore_lab5's rows plus one book nobody has ordered and one
-- customer with no orders.
--
-- A fresh schema for the Lab 9 assignment, named for the lab that owns it.
-- It does not replace bookstore_lab8. Running this file again resets everything.

CREATE DATABASE IF NOT EXISTS bookstore_lab9;
USE bookstore_lab9;

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
