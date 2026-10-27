// controllers/customers.controller.js
const pool = require('../db');

// GET /customers/:id/orders
exports.listOrders = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `SELECT o.id AS order_id, b.id AS book_id, b.title, o.quantity
         FROM orders o JOIN books b ON b.id = o.book_id
        WHERE o.customer_id = ? ORDER BY o.id`,
      [req.params.id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const isPosInt = (v) => Number.isInteger(v) && v > 0;

// ---------------------------------------------------------------------
// Lab 9 Q2 + Q3 + Q4: transactional order
// POST /customers/:id/orders        body: { "book_id": 1, "quantity": 2 }
// ---------------------------------------------------------------------
exports.placeOrder = async (req, res) => {
  const customerId = Number(req.params.id);
  const bookId = Number(req.body.book_id);
  const quantity = Number(req.body.quantity);

  // Validate BEFORE borrowing a connection. A negative quantity would
  // otherwise pass the guard (stock >= -2 is always true) and ADD stock.
  if (!isPosInt(customerId) || !isPosInt(bookId) || !isPosInt(quantity)) {
    return res.status(400).json({ error: 'customer id, book_id and quantity must be positive integers' });
  }

  const conn = await pool.getConnection();                 // borrow ONE connection
  try {
    await conn.beginTransaction();                         // begin

    // Lab 9 Q3: guarded UPDATE - only succeeds when enough stock is available
    const [u] = await conn.execute(
      'UPDATE books SET stock = stock - ? WHERE id = ? AND stock >= ?',
      [quantity, bookId, quantity]);
    if (u.affectedRows === 0) {
      await conn.rollback();                               // rule broken -> undo
      const [b] = await conn.execute('SELECT stock FROM books WHERE id = ?', [bookId]);
      if (b.length === 0) return res.status(404).json({ error: 'book not found' });
      return res.status(409).json({
        error: `not enough stock: requested ${quantity}, available ${b[0].stock}`,
      });
    }

    // Lab 9 Q2: record the order on the SAME connection
    const [r] = await conn.execute(
      'INSERT INTO orders (customer_id, book_id, quantity) VALUES (?, ?, ?)',
      [customerId, bookId, quantity]);

    await conn.commit();                                   // both, for good
    res.status(201).json({ id: r.insertId });
  } catch (err) {
    // Lab 9 Q4: any failure after the UPDATE (e.g. FK error on the INSERT) lands here
    await conn.rollback();                                 // stock change undone
    if (err.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(404).json({ error: 'customer not found - order rolled back' });
    }
    res.status(500).json({ error: err.message });
  } finally {
    conn.release();                                        // ALWAYS
  }
};

// ---------------------------------------------------------------------
// Lab 9 Q5: transactional cancel
// DELETE /customers/:id/orders/:orderId
// ---------------------------------------------------------------------
exports.cancelOrder = async (req, res) => {
  const customerId = Number(req.params.id);
  const orderId = Number(req.params.orderId);
  if (!isPosInt(customerId) || !isPosInt(orderId)) {
    return res.status(400).json({ error: 'ids must be positive integers' });
  }

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // 1. read the order (and lock the row) - it must belong to this customer
    const [rows] = await conn.execute(
      'SELECT book_id, quantity FROM orders WHERE id = ? AND customer_id = ? FOR UPDATE',
      [orderId, customerId]);
    if (rows.length === 0) {
      await conn.rollback();
      return res.status(404).json({ error: 'order not found' });
    }
    const { book_id: bookId, quantity } = rows[0];

    // 2. delete the order
    await conn.execute('DELETE FROM orders WHERE id = ?', [orderId]);

    // 3. give the stock back
    await conn.execute('UPDATE books SET stock = stock + ? WHERE id = ?', [quantity, bookId]);

    await conn.commit();
    res.status(204).end();
  } catch (err) {
    await conn.rollback();
    res.status(500).json({ error: err.message });
  } finally {
    conn.release();
  }
};
