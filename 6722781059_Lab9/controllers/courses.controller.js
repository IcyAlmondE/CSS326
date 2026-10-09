const pool = require('../db');

// GET /courses  (run Exercise 1's ALTER TABLE first, or the seats column won't exist)
exports.list = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, code, title, seats FROM courses ORDER BY id');
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
};
