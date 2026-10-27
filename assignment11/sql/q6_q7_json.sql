-- =====================================================================
-- Assignment 11 - Q6 and Q7 : JSON column and JSON queries (Workbench)
-- =====================================================================
USE bookstore_lab11;

-- ---------- Q6: JSON column (1.5 points) ----------
-- TODO: add a JSON column called attributes to books
ALTER TABLE books ADD COLUMN attributes JSON;

-- TODO: store {format, pages} for EVERY book with JSON_OBJECT.
--       Use 'hardcover', 'paperback' or 'ebook', and make at least two ebooks.
--       Example:
UPDATE books SET attributes = JSON_OBJECT('format','hardcover','pages',1376) WHERE id = 3;
UPDATE books SET attributes = JSON_OBJECT('format','paperback','pages',520) WHERE id = 1;
UPDATE books SET attributes = JSON_OBJECT('format','ebook','pages',865) WHERE id = 2;
UPDATE books SET attributes = JSON_OBJECT('format','ebook','pages',445) WHERE id = 4;
UPDATE books SET attributes = JSON_OBJECT('format','hardcover','pages',958) WHERE id = 5;
UPDATE books SET attributes = JSON_OBJECT('format','hardcover','pages',630) WHERE id = 6;
UPDATE books SET attributes = JSON_OBJECT('format','paperback','pages',432) WHERE id = 7;
UPDATE books SET attributes = JSON_OBJECT('format','paperback','pages',649) WHERE id = 8;

SELECT id, title, attributes FROM books;

-- ---------- Q7: query JSON (1.5 points, SQL part) ----------
-- TODO: every book's title with its format (use ->>)
SELECT title, attributes->>'$.format' AS format FROM books;
-- TODO: only the books whose format is 'ebook'
SELECT title, attributes->>'$.format' AS format FROM books
WHERE attributes->>'$.format' = 'ebook';