// controllers/books.controller.js
const pool = require('../db');

// GET /books   (the first 20 books only: the table now holds 50,008)
exports.list = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM books ORDER BY id LIMIT 20');
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

// GET /books/search?author=...
exports.searchByAuthor = async (req, res) => {
  try {
    const author = req.query.author || '';
    // TODO (Assignment Q5): this builds SQL by gluing in the value.
    // const sql = "SELECT id, title, author, price FROM books WHERE author = ?";
    const [rows] = await pool.execute('SELECT id, title, author, price FROM books WHERE author = ?', [author]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
