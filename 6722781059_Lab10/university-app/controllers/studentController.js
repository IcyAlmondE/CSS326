// controllers/studentController.js
const pool = require('../config/db');

// GET /api/students
exports.getAll = async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT id, name, major FROM students ORDER BY id');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message, sql: err.sql });
  }
};

// GET /api/students/:id/courses
exports.getCourses = async (req, res) => {
  if (id <= 0 || !Number.isInteger(id)) {
    return res.status(400).json({error: 'Student id must be a positive whole number'});
  }
  try {
    // TODO (Exercise 3): UNSAFE! The id is glued into the SQL text.
    // Try:  /api/students/1 OR 1=1/courses
    // Check the id is a positive whole number first (400 otherwise), then use ?.
    const id = Number(req.params.id);
    const sql =
      'SELECT c.id, c.title, e.grade FROM enrolments e ' +
      'JOIN courses c ON c.id = e.course_id ' +
      'WHERE e.student_id = ?' [id];
    const [rows] = await pool.query(sql);
    res.json(rows);
  } catch (err) {
    fail(res, err);
  }
};
