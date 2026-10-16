-- Exercise 1: Index and EXPLAIN
-- Database: css326_lab10 (run database/01, 02 and 03 first, as root)
-- Goal: show, with evidence, that an index makes a query faster.
USE css326_lab10;

-- Step 1. Pick a query you run often with a WHERE on a non-key column.
--         A suggestion is below; you may choose another (for example students.name).
EXPLAIN SELECT * FROM courses WHERE title = 'Operating Systems';
-- TODO: record type, key and rows in the results table at the bottom.

-- Step 2. Measure the real time. Run it twice and use the second result.
EXPLAIN ANALYZE SELECT * FROM courses WHERE title = 'Operating Systems';
-- TODO: record the actual time (the last number in "actual time=a..b", in ms).

-- Step 3. Create an index on that column.
-- TODO: write your CREATE INDEX statement here.
CREATE INDEX idx_course_title ON courses (title);

-- Step 4. Check that the index exists.
-- TODO: write the statement that lists the indexes on the table.
SHOW INDEX FROM courses;

-- Step 5. Run EXPLAIN and EXPLAIN ANALYZE again.
-- TODO
EXPLAIN SELECT * FROM courses WHERE title = 'Operating Systems';
EXPLAIN ANALYZE SELECT * FROM courses WHERE title = 'Operating Systems';

-- Results (fill in):
--                 type     key                 rows       actual time (ms)
--   before:       ALL      NULL                100005     0.0877
--   after:        ref      idx_course_title    1          0.0242
-- One sentence: what changed, and why?
-- Time and rows checked changes because the dimension of data checking is reduced from 2 to 1.
