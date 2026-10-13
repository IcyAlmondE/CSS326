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
