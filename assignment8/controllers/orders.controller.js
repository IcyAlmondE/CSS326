// controllers/orders.controller.js
const pool = require('../db');

// Lab 8 -- Task 1: write exports.details for GET /details (three-table JOIN:
// order id, customer name, book title, quantity).
exports.details = async (req, res) => {
    try {
        const [rows] = await pool.execute(`
            SELECT o.id, c.name, b.title, o.quantity
            FROM orders o
            JOIN customers c ON o.customer_id = c.id
            JOIN books b ON o.book_id = b.id
            `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

// Lab 8 -- Task 3: write exports.view for GET /view (SELECT * FROM order_details,
// after creating the view).
exports.view = async (req, res) => {
    try {
        await pool.execute(`
            CREATE OR REPLACE VIEW order_details AS
                SELECT o.id, c.name, b.title, o.quantity
                FROM orders o
                JOIN customers c ON o.customer_id = c.id
                JOIN books b ON o.book_id = b.id
            `);
        const [rows] = await pool.query('SELECT * FROM order_details');
        res.json(rows);
    } catch (err) {
        res.status(500).json({error : err.message});
    }
}