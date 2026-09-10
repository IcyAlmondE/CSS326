-- CSS326 -- bookstore_lab5 schema, seeded for the Lab 5 assignment
-- Matches the schema box printed in CSS326-Lab_Assignment_05_songphon.docx:
--   books( id, title, author, price, stock )
--
-- A fresh schema for Lab 5, named for the lab that owns it - the same
-- convention as bookstore_lab3, which it does not replace. Note that orders
-- here is flat: one book per order row, no order_items table.
--   customers( id, name, email )
--   orders( id, customer_id, book_id, quantity )

CREATE DATABASE IF NOT EXISTS bookstore_lab5;
USE bookstore_lab5;

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
  FOREIGN KEY (book_id)     REFERENCES books(id)
);

INSERT INTO books (title, author, price, stock) VALUES
  ('Clean Code',                 'Robert C. Martin', 950.00, 12),
  ('The Pragmatic Programmer',   'Andrew Hunt',       890.00, 8),
  ('Database System Concepts',   'Abraham Silberschatz', 1200.00, 5),
  ('Designing Data-Intensive Applications', 'Martin Kleppmann', 1500.00, 6),
  ('Introduction to Algorithms', 'Thomas H. Cormen',  1650.00, 4);

INSERT INTO customers (name, email) VALUES
  ('Pim Suwannarat', 'pim.s@example.com'),
  ('Nat Chaiyaporn', 'nat.c@example.com'),
  ('Ploy Rattanakorn', 'ploy.r@example.com');

INSERT INTO orders (customer_id, book_id, quantity) VALUES
  (1, 1, 1),
  (1, 3, 2),
  (2, 2, 1),
  (3, 4, 1),
  (3, 5, 3);
