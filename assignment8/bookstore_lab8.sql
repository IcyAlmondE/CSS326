-- CSS326 -- bookstore_lab8 schema, seeded for the Lab 8 assignment
-- Same tables as bookstore_lab5 (the schema box in the assignment):
--   books( id, title, author, price, stock )
--   customers( id, name, email )
--   orders( id, customer_id, book_id, quantity )   -- the junction
-- Seed = bookstore_lab5's rows plus one book nobody has ordered and one
-- customer with no orders, so Tasks 2 and 4 have something to show.

CREATE DATABASE IF NOT EXISTS bookstore_lab8;
USE bookstore_lab8;

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
  FOREIGN KEY (book_id)     REFERENCES books(id)
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

CREATE VIEW order_details AS
	SELECT o.id, c.name, b.title, o.quantity
	FROM orders o
	JOIN customers c ON o.customer_id = c.id
	JOIN books b ON o.book_id = b.id