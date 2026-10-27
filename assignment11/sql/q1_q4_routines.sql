-- =====================================================================
-- Assignment 11 - Q1 to Q4 : procedure, function, triggers (Workbench)
-- Take screenshots of the result grids for your submission.
-- Keep the DELIMITER lines around every routine and trigger.
-- =====================================================================
USE bookstore_lab11;

-- ---------- Q1: stored procedure (1.5 points) ----------
-- place_order(IN p_customer INT, IN p_book INT, IN p_qty INT) inserts one order.
DROP PROCEDURE IF EXISTS place_order;
-- TODO: DELIMITER // ... CREATE PROCEDURE ... END // DELIMITER ;
DELIMITER //
CREATE PROCEDURE place_order(IN p_customer INT, IN p_book INT, IN p_qty INT)
BEGIN
	INSERT INTO orders (customer_id, book_id, quantity) VALUES (p_customer, p_book, p_qty);
END // 
DELIMITER ;
-- TODO: CALL it for customer 4, book 2, quantity 1
CALL place_order(4, 2, 1);
SELECT * FROM orders ORDER BY id;

-- ---------- Q2: stored function (1.5 points) ----------
-- order_count(p_customer INT) RETURNS INT - how many orders a customer has.
-- Remember READS SQL DATA (error 1418 otherwise).
DROP FUNCTION IF EXISTS order_count;
-- TODO
DELIMITER //
CREATE FUNCTION order_count(p_customer INT) RETURNS INT
READS SQL DATA
BEGIN
	DECLARE n INT;
    SELECT COUNT(*) INTO n FROM orders WHERE customer_id = p_customer;
    RETURN n;
END //
DELIMITER ;
-- TODO: SELECT every customer with order_count(id) AS orders
SELECT name, order_count(id) FROM customers; 

-- ---------- Q3: AFTER INSERT trigger with a stock guard (1.5 points) ----------
-- Reduce the book's stock by NEW.quantity, but only WHERE stock >= NEW.quantity.
-- If ROW_COUNT() = 0, SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'not enough stock';
DROP TRIGGER IF EXISTS after_order_insert;
-- TODO
DELIMITER //
CREATE TRIGGER after_order_insert
AFTER INSERT ON orders
FOR EACH ROW
BEGIN
	UPDATE books SET stock = stock - NEW.quantity
    WHERE id = NEW.book_id AND stock >= NEW.quantity;
    IF ROW_COUNT() = 0 THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'not enough stock';
	END IF;
END //
DELIMITER ;

SELECT id, title, stock FROM books WHERE id = 6;
-- TODO: CALL place_order for 2 copies of book 6, then check the stock again
CALL place_order(1, 6, 2);
-- TODO: CALL place_order for 6 copies of book 6 (only 5 left now) -> error 1644
CALL place_order(2, 6, 6);
-- Workbench stops the script at this error: select the lines below and run them separately.
SELECT * FROM orders WHERE book_id = 6;

-- ---------- Q4: AFTER DELETE trigger (1.5 points) ----------
-- Put OLD.quantity back into the stock of OLD.book_id.
DROP TRIGGER IF EXISTS after_order_delete;
-- TODO
DELIMITER //
CREATE TRIGGER after_order_delete
AFTER DELETE ON orders
FOR EACH ROW
BEGIN
	UPDATE books SET stock = stock + OLD.quantity
    WHERE id = OLD.book_id;
END //
DELIMITER ;
-- TODO: delete the order you placed for book 6 and show its stock is restored
DELETE FROM orders WHERE id = 7;
SHOW TRIGGERS;
