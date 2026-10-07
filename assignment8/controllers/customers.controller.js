// controllers/customers.controller.js
const pool = require('../db');

// GET /customers
exports.list = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM customers');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /customers/:id
exports.getOne = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM customers WHERE id = ?', [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'not found' });

// Lab 8 -- Task 4: extend getOne above so it also returns an orders array
// (join orders to books for each order's title and quantity; a customer with
// no orders should get an empty array, not an error).
    const [orders] = await pool.execute(`
        SELECT b.title, o.quantity
        FROM orders o
        JOIN books b ON o.book_id = b.id
        JOIN customers c ON o.customer_id = c.id
        WHERE o.customer_id = ?`, [req.params.id]);

    res.json({...rows[0], orders});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lab 8 -- Task 5: write exports.placeOrder for POST /:id/orders below
// (validate book_id and quantity, insert, 201 with the new id).
exports.placeOrder = async (req, res) => {
  try {
    const customerId = req.params.id;
    const {book_id, quantity} = req.body;

    if (quantity < 0 || !Number.isInteger(quantity)) 
      return res.status(400).json({ error: 'quantity must be a positive integer' });

    const [books] = await pool.execute(`
      SELECT id FROM books
      `);
    if (!(book_id in books)) return res.status(400).json({ error: 'unknown book' });

    const [rows] = await pool.execute(`
      INSERT INTO orders (customer_id, book_id, quantity) VALUES (?, ?, ?)`, 
    [customerId, book_id, quantity]);
    res.status(201).json({ id: rows.insertId});
  } catch (err) {
    res.status(500).json({error : err.message});
  }
}

// curl.exe -i -X POST http://localhost:3000/customers/1/orders `
//   -H "Content-Type: application/json" `
//   -d "@order.json"

// Lab 8 -- Task 6: write exports.cancelOrder for DELETE /:id/orders/:orderId below
// (delete the order only if it belongs to this customer; 404 if none, otherwise 204).
exports.cancelOrder = async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      DELETE FROM orders WHERE customer_id = ? AND id = ?
      `, [req.params.id, req.params.orderId]);
    if (rows.affectedRows === 0) return res.status(404).json({ error: 'order not found' });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({error : err.message});
  }
}

// curl.exe -i -X DELETE http://localhost:3000/customers/1/orders/6