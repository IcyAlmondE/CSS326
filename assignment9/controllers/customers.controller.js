// controllers/customers.controller.js
const pool = require('../db');

exports.list = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM customers');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /customers/:id/orders  (done for you)
exports.getOne = async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM customers WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'not found' });
    const [orders] = await pool.execute(
      `SELECT o.id AS order_id, b.id AS book_id, b.title, o.quantity
         FROM orders o JOIN books b ON b.id = o.book_id
        WHERE o.customer_id = ? ORDER BY o.id`, [req.params.id]);
    res.json({ ...rows[0], orders });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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

// ---------------------------------------------------------------------
// Q2 + Q3 + Q4 : Transactional order
// POST /customers/:id/orders        body: { "book_id": 1, "quantity": 2 }
//
// This version works, but it is NOT atomic and NOT safe:
//   * the two statements run on the pool, outside any transaction;
//   * if the INSERT fails, the stock has already been reduced;
//   * nothing checks that enough stock is available.
//
// TODO (Q2): first reject a book_id / quantity that is not a positive whole
//            number with 400. Then:
//            getConnection -> beginTransaction -> UPDATE + INSERT -> commit,
//            rollback in catch, release in finally.   201 on success.
// TODO (Q3): guard the UPDATE with  AND stock >= ?  - if it affects no rows,
//            roll back and return 409 with a clear message.
// TODO (Q4): force the INSERT to fail and show the stock change is undone.
// ---------------------------------------------------------------------
exports.placeOrder = async (req, res) => {
  const customerId = req.params.id;
  const { book_id, quantity } = req.body;
  // try {
  //   await pool.execute('UPDATE books SET stock = stock - ? WHERE id = ?', [quantity, book_id]);
  //   const [r] = await pool.execute(
  //     'INSERT INTO orders (customer_id, book_id, quantity) VALUES (?, ?, ?)',
  //     [customerId, book_id, quantity]);
  //   res.status(201).json({ id: r.insertId });
  // } catch (err) {
  //   // unknown book (foreign key) lands here too
  //   res.status(400).json({ error: err.message });
  // }
  if (!Number.isInteger(book_id) || !Number.isInteger(quantity) || book_id <= 0 || quantity <= 0){
    return res.status(400).json({error: 'invalid input'});
  }

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const [u] = await conn.execute(
      `UPDATE books SET stock = stock - ? WHERE id = ? AND stock >= ?`, [quantity, book_id, quantity]
    );
    if (u.affectedRows === 0){
      await conn.rollback();
      return res.status(409).json({error: 'not enough book in stock'});
    }

    const [r] = await conn.execute(
      `INSERT INTO orders (customer_id, book_id, quantity) VALUES (?, ?, ?)`, [customerId, book_id, quantity]
    );
    await conn.commit();
    res.status(201).json({ id: r.insertId });
  } catch (err) {
      await conn.rollback();
      res.status(500).json({error: err.message});
  } finally {
    conn.release();
  }
};

// ---------------------------------------------------------------------
// Q5 : Transactional cancel
// DELETE /customers/:id/orders/:orderId
//
// This version deletes the order, but it never gives the stock back.
//
// TODO (Q5): inside ONE transaction
//   1. look up the order's book_id and quantity (it must belong to customer :id)
//   2. if there is no such order -> roll back and return 404
//   3. delete the order
//   4. add the quantity back to the book's stock
//   5. commit and return 204
// ---------------------------------------------------------------------
exports.cancelOrder = async (req, res) => {
  // try {
  //   const [r] = await pool.execute(
  //     'DELETE FROM orders WHERE id = ? AND customer_id = ?',
  //     [req.params.orderId, req.params.id]
  //   );
  //   if (r.affectedRows === 0) return res.status(404).json({ error: 'order not found' });
  //   res.status(204).end();
  // } catch (err) {
  //   res.status(500).json({ error: err.message });
  // }

  const conn = await pool.getConnection();
  try{
    const [u] = await conn.execute(
      `DELETE FROM orders WHERE id = ? AND customer_id = ?`, [req.params.orderId, req.params.id]
    );
    if (u.affectedRows === 0) {
      conn.rollback();
      return res.status(404).json({ error: 'order not found' });
    }
    
    const {book_id, quantity} = u[0];
    const [r] = await pool.execute(
      `UPDATE books SET stock = stock + ? WHERE id = ?`, [quantity, book_id]
    );
    if (r.affectedRows === 0) {
      conn.rollback();
      return res.status(404).json({ error: 'order not found' });
    }

    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    conn.release();
  }
};
