-- CSS326 Lab Assignment 10: Hardening: Performance & Security
-- Name: Natthapon Chantaracha   Student ID: 6722781059
-- Database: bookstore_lab10 (run sql/bookstore_lab10.sql and sql/bookstore_lab10_bulk.sql first, as root)
USE bookstore_lab10;

-- Q1. Measure first (1.5 points)
--     EXPLAIN and EXPLAIN ANALYZE a query on books that filters by author.
--     Record type, key, rows and actual time. Screenshot.
EXPLAIN SELECT * FROM books WHERE author = 'Ben Forta';
EXPLAIN ANALYZE SELECT * FROM books WHERE author = 'Ben Forta';

-- Q2. Add an index (1.5 points)
--     CREATE INDEX, then repeat Q1. Record what changed. Screenshot.
CREATE INDEX idx_books_title_author ON books (title, author);
EXPLAIN SELECT * FROM books WHERE author = 'Ben Forta';
EXPLAIN ANALYZE SELECT * FROM books WHERE author = 'Ben Forta';

-- Q3. Joins and foreign keys (1.5 points)
--     SHOW INDEX FROM orders; EXPLAIN a query that joins orders to customers
--     for one customer. Answer the question on the sheet in a comment.
SHOW INDEX FROM orders;
EXPLAIN SELECT * FROM orders o JOIN books b ON o.book_id = b.id WHERE o.customer_id = 42;

-- Q4. The cost of indexes (1 point): answer in a comment.
-- slows down write operations (such as INSERT, UPDATE, and DELETE)
-- because the database must update the index structure every time the underlying data changes.
-- Select index by choosing ones with high cardinality and has a lot of unique values.


-- Q5. Injection and the fix (2 points): code changes in controllers/books.controller.js.
--     Paste the before and after code here as comments, with your explanation.

--     before: const sql = "SELECT id, title, author, price FROM books WHERE author = '" + author + "'";
--             const [rows] = await pool.query(sql);

--     after:  const sql = "SELECT id, title, author, price FROM books WHERE author = ?";
--             const [rows] = await pool.query(sql, [author]);

-- Before fixing, sql can be injected with '1' = '1' and will bypass any data. 
-- Fixing it with placeholder will make the script accept only input data.


-- Q6. Least privilege (2 points)
--     CREATE USER, GRANT, SHOW GRANTS, and the failed DROP test.
CREATE USER 'bookstore_app'@'localhost' IDENTIFIED BY 'a_strong_password';
GRANT SELECT, INSERT, UPDATE, DELETE ON bookstore_lab10.* TO 'bookstore_app'@'localhost';
SHOW GRANTS FOR 'bookstore_app'@'localhost';
DROP TABLE orders;

-- Q7. Protect secrets (1.5 points): .env, .gitignore and db.js.
--     Explain in a comment why .env must not be committed to Git.
-- .env should not be committed because it’s the security of the database. 
-- It should be accessible only in the root device. If it is committed, there is a risk in the password going out.


-- Q8. Short answer (1 point): answer in a comment.
-- Connecting directly to the root will expose the entire database system to damage if attacked.
