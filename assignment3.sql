CREATE DATABASE IF NOT EXISTS assignment3;
USE assignment3;

# Task 1
DESCRIBE books;

# Task 2
INSERT INTO books (title, author, price, stock) VALUES
('Clean Code','Robert C. Martin',520,8),
('The Pragmatic Programmer','Andrew Hunt',610,5),
('Refactoring','Martin Fowler',700,3),
('Database Internals','Alex Petrov',850,4),
('SQL in 10 Minutes','Ben Forta',300,12),
('Designing Data-Intensive Applications','Martin Kleppmann',950,6),
('Head First SQL','Lynn Beighley',420,9),
('Learning MySQL','Seyed Tahaghoghi',640,2),
('Patterns of Enterprise Application Architecture','Martin Fowler',880,3),
('MySQL Crash Course','Ben Forta',360,10);

INSERT INTO customers (name, email) VALUES
('Pim','pim@example.com'),('Nate','nate@example.com'),
('Som','som@example.com'),('Lek','lek@example.com');
-- customer_id 1..4, book_id 1..10 (from the order above)

INSERT INTO orders (customer_id, book_id, quantity) VALUES
(1,1,1),(1,5,2),(2,3,1),(2,6,1),(3,2,3),(4,4,1),(4,7,2);

INSERT INTO books (title, author, price, stock) VALUES
('Mein Kampf', 'Adolf Hitler', 400, 67),
('Harry Potter', 'J.K. Rowling', 500, 10);

SELECT * FROM books;

# Task 3
SELECT title, price FROM books WHERE price > 500;
SELECT DISTINCT author FROM books;

# Task 4
SELECT name FROM customers WHERE name LIKE 'N%';
SELECT * FROM books WHERE price BETWEEN 400 AND 700 ORDER BY price;
SELECT * FROM books WHERE author IN ('Martin Fowler', 'Ben Forta');

# Task 5
SELECT author, COUNT(*) AS n, SUM(stock) AS total_stocks, AVG(price) AS avg_price
FROM books GROUP BY author
HAVING COUNT(*)>1 ORDER BY n;

# Task 6
SELECT title, ROUND(price*1.07, 2) AS vat_price FROM books;
SELECT ABS(600-price) AS abs, POWER(price, 2) as power, SQRT(price) as sqrt FROM books;

# Task 7
SELECT VERSION();
SELECT NOW();
SELECT CONCAT(title, ' - ', author) as title_author FROM books;

# Task 8
SELECT * FROM books;
UPDATE books SET price = price*1.1 WHERE id = 11;
SELECT * FROM books;

SELECT * FROM orders;
DELETE FROM orders WHERE id = 5;
SELECT * FROM orders;

# Task 9
ALTER TABLE orders ADD CONSTRAINT fk_book_id
FOREIGN KEY (book_id) REFERENCES parent(id);
INSERT INTO orders (customer_id, book_id, quantity) VALUES (13,1,1);
CREATE INDEX idx_customer ON orders (customer_id);
SELECT * FROM orders;

# Task 10
SELECT c.name, b.title, o.quantity FROM orders o
INNER JOIN books b ON o.book_id = b.id
INNER JOIN customers c ON o.customer_id = c.id;

SELECT c.name, b.title, o.quantity FROM orders o
INNER JOIN books b ON o.book_id = b.id
INNER JOIN customers c ON o.customer_id = c.id
WHERE c.id = 1;

SELECT c.name, b.title, o.quantity FROM orders o
INNER JOIN books b ON o.book_id = b.id
INNER JOIN customers c ON o.customer_id = c.id
ORDER BY b.title;