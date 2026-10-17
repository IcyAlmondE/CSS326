const pool = require('../db');

// ---------------------------------------------------------------------
// GET /students  -> used by the front-end's student table and list
//
// TODO (Exercise 3): after Exercise 1, add your stored function to the
// SELECT so every student also has a course count:
//     course_count(Id) AS courses
// The front-end shows it in the Courses column.
// ---------------------------------------------------------------------
exports.list = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT Id AS id, name, major, course_count(Id) AS courses FROM students ORDER BY Id');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
