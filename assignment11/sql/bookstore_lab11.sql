-- CSS326 -- bookstore_lab11 schema, seeded for the Lab 11 assignment
-- Same tables and rows as bookstore_lab10 (without its bulk file):
--   books( id, title, author, price, stock )
--   customers( id, name, email )
--   orders( id, customer_id, book_id, quantity )   -- FKs to customers and books
-- orders also carries CHECK (quantity > 0), so a zero or negative quantity is
-- rejected by the database itself. The foreign keys matter here too: an order
-- that points to a customer or book that does not exist is REJECTED.
-- Seed = bookstore_lab9's rows (6 books, 4 customers, 5 orders) plus the two books
-- by Ben Forta that Lab 10 added: 8 books, 4 customers, 5 orders.
-- The procedure, the function, the triggers and the attributes JSON column are NOT
-- created here: you write them in Q1-Q4 and Q6.
--
-- A fresh schema for the Lab 11 assignment, named for the lab that owns it.
-- It does not replace bookstore_lab10. The file drops and re-creates the whole
-- database, so running it again resets everything, including your procedure,
-- function, triggers and the attributes column.
--
-- The last lines make sure the app user exists and give it the rights it needs on
-- this schema. EXECUTE is the new one: the app now CALLs place_order and uses
-- order_count(), and without EXECUTE MySQL answers "execute command denied".
-- An existing bookstore_app (from Lab 10) keeps its password.

DROP DATABASE IF EXISTS bookstore_lab11;
CREATE DATABASE bookstore_lab11;
USE bookstore_lab11;

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

-- Added in Lab 10 (the Lab 9 rows above are unchanged): the two books by Ben Forta.
INSERT INTO books (title, author, price, stock) VALUES
  ('SQL in 10 Minutes',          'Ben Forta',         590.00, 12),
  ('MySQL Crash Course',         'Ben Forta',         650.00, 8);

-- The app user (created in Lab 10 Q6). The four Lab 10 privileges plus EXECUTE,
-- on this schema only.
CREATE USER IF NOT EXISTS 'bookstore_app'@'localhost' IDENTIFIED BY 'a_strong_password';
GRANT SELECT, INSERT, UPDATE, DELETE, EXECUTE ON bookstore_lab11.* TO 'bookstore_app'@'localhost';
