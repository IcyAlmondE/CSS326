// controllers/courseController.js
const pool = require('../config/db');

function fail(res, err) {
  console.error(err);
  res.status(500).json({ error: "Something went wrong."});
}

// GET /api/courses
exports.getAll = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT id, title, credits, seats FROM courses ORDER BY id LIMIT 20'
    );
    res.json(rows);
  } catch (err) {
    // TODO (Exercise 3): never send raw database errors to the client.
    fail(res, err);
  }
};

// GET /api/courses/search?title=...
exports.search = async (req, res) => {
  try {
    const title = req.query.title || '';
    // TODO (Exercise 3): UNSAFE! The value is glued into the SQL text.
    // Try searching for:   ' OR '1'='1
    // const sql = "SELECT id, title, credits, seats FROM courses WHERE title = '" + title + "'";
    const [rows] = await pool.execute(
      `SELECT id, title, credits, seats FROM courses WHERE title = ?`, [title]
    );
    res.json(rows);
  } catch (err) {
    fail(res, err);
  }
};
