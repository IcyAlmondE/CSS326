const pool = require('../db');
exports.list = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM courses');
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
};
