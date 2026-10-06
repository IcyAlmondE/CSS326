// controllers/students.controller.js
const pool = require('../db');

// GET /students
exports.list = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM students');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /students/:id
exports.getOne = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM students WHERE id = ?', [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /students
exports.create = async (req, res) => {
  try {
    const { name, major, year } = req.body;

    if (!name || !major)
      return res.status(400).json({ error: 'name and major are required' });
    if (!Number.isInteger(year) || year < 1 || year > 4)
      return res.status(400).json({ error: 'year must be 1 to 4' });

    const [r] = await pool.execute(
      'INSERT INTO students (name, major, year) VALUES (?, ?, ?)',
      [name, major, year]
    );
    res.status(201).json({ id: r.insertId, name, major, year });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /students/:id
exports.update = async (req, res) => {
  try {
    const [r] = await pool.execute(
      'UPDATE students SET major = ? WHERE id = ?',
      [req.body.major, req.params.id]
    );
    if (r.affectedRows === 0) return res.status(404).json({ error: 'not found' });
    res.json({ updated: r.affectedRows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /students/:id
exports.remove = async (req, res) => {
  try {
    const [r] = await pool.execute(
      'DELETE FROM students WHERE id = ?', [req.params.id]
    );
    if (r.affectedRows === 0) return res.status(404).json({ error: 'not found' });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lab 8 -- write exports.courses (Exercise 2), exports.enrol and exports.unenrol (Exercise 4) below.
exports.courses = async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT c.id, c.title, e.grade
      FROM enrolments e
      JOIN courses c ON e.course_id = c.id
      WHERE e.student_id = ?`, [req.params.id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
}

exports.enrol = async (req, res) => {
  try {
    const { course_id, grade } = req.body;
    if (!course_id
) return res.status(400).json({ error: 'course_id is required' });
    const [r] = await pool.execute(
      'INSERT INTO enrolments (student_id, course_id, grade) VALUES (?, ?, ?)',
      [req.params.id, course_id, grade ?? null]);
    res.status(201).json({ id: r.insertId });
  } catch (err) {
    // foreign-key failure (unknown course) or duplicate enrolment lands here
    res.status(400).json({ error: err.message });
  }
};

exports.unenrol = async (req, res) => {
  try {
    const [r] = await pool.execute(
      'DELETE FROM enrolments WHERE student_id = ? AND course_id = ?',
      [req.params.id, req.params.courseId]);
    if (r.affectedRows === 0) return res.status(404).json({ error: 'enrolment not found' });
    res.status(204).end();
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Exercise 3: extend getOne above so it also returns a courses array -- read the student
// (404 if none), then its courses with the Exercise 2 query. One student needs no Map:
// a query filtered by one id never returns rows for anyone else (lab sheet, Section 8).
exports.getOne = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM students WHERE id = ?', [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'not found' });

    const [courses] = await pool.execute(`
      SELECT c.id, c.title, e.grade
      FROM enrolments e
      JOIN courses c ON e.course_id = c.id
      WHERE e.student_id = ?`, [req.params.id]);
    res.json({...rows[0], courses});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
}