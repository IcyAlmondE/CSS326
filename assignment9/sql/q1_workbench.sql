-- =====================================================================
-- Assignment 9 - Q1 : transactions in Workbench  (1.5 points)
-- Take screenshots of the result grids for your submission.
-- =====================================================================
USE bookstore_lab9;

-- Before
SELECT id, title, stock FROM books WHERE id = 1;
SELECT * FROM orders;

-- Part A: reduce book 1's stock by 2 and insert a matching order
--         for customer 4, then COMMIT
-- TODO
START TRANSACTION;
UPDATE books SET stock = stock - 1 WHERE id = 1;
INSERT INTO orders (customer_id, book_id, quantity) VALUES (1, 1, 1);
COMMIT;

-- Check
SELECT id, title, stock FROM books WHERE id = 1;
SELECT * FROM orders;

-- Part B: the same two statements, but ROLLBACK instead of COMMIT
-- TODO
START TRANSACTION;
UPDATE books SET stock = stock - 1 WHERE id = 1;
INSERT INTO orders (customer_id, book_id, quantity) VALUES (1, 1, 1);
ROLLBACK;

-- Check, then describe (in one sentence) what the data looked like
SELECT id, title, stock FROM books WHERE id = 1;
SELECT * FROM orders;
