// controllers/books.controller.js
const pool = require('../db');

// GET /books
exports.list = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM books');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /books/:id
exports.getOne = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM books WHERE id = ?', [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /books
exports.create = async (req, res) => {
  try {
    const { title, author, price, stock } = req.body;

    if (!title)
      return res.status(400).json({ error: 'title is required' });
    if (typeof price !== 'number' || price <= 0)
      return res.status(400).json({ error: 'price must be a positive number' });

    const [r] = await pool.execute(
      'INSERT INTO books (title, author, price, stock) VALUES (?, ?, ?, ?)',
      [title, author || null, price, stock || 0]
    );
    res.status(201).json({ id: r.insertId, title, author, price, stock });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /books/:id  -- update price and/or stock
exports.update = async (req, res) => {
  try {
    const { price, stock } = req.body;
    const [r] = await pool.execute(
      'UPDATE books SET price = COALESCE(?, price), stock = COALESCE(?, stock) WHERE id = ?',
      [price ?? null, stock ?? null, req.params.id]
    );
    if (r.affectedRows === 0) return res.status(404).json({ error: 'not found' });
    res.json({ updated: r.affectedRows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /books/:id
exports.remove = async (req, res) => {
  try {
    const [r] = await pool.execute('DELETE FROM books WHERE id = ?', [req.params.id]);
    if (r.affectedRows === 0) return res.status(404).json({ error: 'not found' });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.never = async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT *
      FROM books
      WHERE id NOT IN (
        SELECT book_id
        FROM orders)
      `);
    if (rows.length === 0){
      res.status(404).json({error: "not found"});
    } else res.json(rows);
  } catch(err) {
    res.status(500).json({error : err.message});
  }
};
