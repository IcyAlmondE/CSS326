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

// One student WITH a nested courses array (flat JOIN rows -> nested JSON).
exports.getOne = async (req, res) => {
  try {
    const [[student]] = await pool.execute(
      'SELECT * FROM students WHERE id = ?', [req.params.id]);
    if (!student) return res.status(404).json({ error: 'not found' });

    const [rows] = await pool.execute(`
      SELECT c.id, c.title, e.grade
      FROM enrolments e
      JOIN courses c ON e.course_id = c.id
      WHERE e.student_id = ?`, [req.params.id]);

    res.json({ ...student, courses: rows });
  } catch (err) { res.status(500).json({ error: err.message }); }
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

exports.courses = async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT c.id, c.title, e.grade
      FROM enrolments e
      JOIN courses c ON e.course_id = c.id
      WHERE e.student_id = ?`, [req.params.id]);
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// ---------------------------------------------------------------------
// Exercise 2 : A transactional enrol
// POST /students/:id/courses      body: { "course_id": 3 }
//
// The version below WORKS, but it is NOT safe:
//   * the two statements run on whatever pool connection is free,
//     outside any transaction - if the INSERT fails, the seat is lost;
//   * nothing stops seats going below zero;
//   * its catch answers 400 for every error (Lab 8's), whatever went wrong.
//
// TODO: rewrite it using the pattern
//   const conn = await pool.getConnection();
//   try { beginTransaction ... commit } catch { rollback } finally { release }
// and guard the seat with  ... WHERE id = ? AND seats > 0
//   201 -> enrolled       409 -> course is full       500 -> anything else
// ---------------------------------------------------------------------
exports.enrol = async (req, res) => {
  // try {
  //   const { course_id } = req.body;
  //   if (!course_id) return res.status(400).json({ error: 'course_id is required' });
  //   await pool.execute('UPDATE courses SET seats = seats - 1 WHERE id = ?', [course_id]);
  //   const [r] = await pool.execute(
  //     'INSERT INTO enrolments (student_id, course_id) VALUES (?, ?)',
  //     [req.params.id, course_id]);
  //   res.status(201).json({ id: r.insertId });
  // } catch (err) {
  //   // foreign-key failure (unknown course) or duplicate enrolment lands here
  //   res.status(400).json({ error: err.message });
  // }

  const {course_id} = req.body;
  if (!course_id) return res.status(400).json({error: 'course if is required'});

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const [u] = await conn.execute(
      `UPDATE courses SET seats = seats - 1 WHERE id = ? AND seats > 0`, [course_id]
    );
    if (u.affectedRows === 0){
      await conn.rollback();
      return res.status(409).json({error: 'course is full'});
    }
    const [r] = await conn.execute(
      `INSERT INTO enrolments (student_id, course_id) VALUES (?, ?)`, [req.params.id, course_id]
    );
    await conn.commit();
    res.status(201).json({id: r.insertId});
  } catch (err) {
    await conn.rollback();
    res.status(500).json({error: err.message});
  } finally {
    conn.release();
  }
};

// ---------------------------------------------------------------------
// Exercise 3 : Cancel atomically
// DELETE /students/:id/courses/:courseId
//
// The version below deletes the enrolment, but it never gives the seat back.
//
// TODO: inside ONE transaction
//   1. DELETE the enrolment row for this student + course
//   2. if nothing was deleted -> roll back and return 404
//   3. give the seat back:  UPDATE courses SET seats = seats + 1 WHERE id = ?
//   4. commit and return 204
// Remember: release the connection in finally.
// ---------------------------------------------------------------------
exports.unenrol = async (req, res) => {
  // try {
  //   const [r] = await pool.execute(
  //     'DELETE FROM enrolments WHERE student_id = ? AND course_id = ?',
  //     [req.params.id, req.params.courseId]);
  //   if (r.affectedRows === 0) return res.status(404).json({ error: 'enrolment not found' });
  //   res.status(204).end();
  // } catch (err) { res.status(500).json({ error: err.message }); }

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const [r] = await conn.execute(
      `DELETE FROM enrolments WHERE student_id = ? AND course_id = ?`,
    [req.params.id, req.params.courseId]);
    if (r.affectedRows === 0){
      await conn.rollback();
      res.status(404).json({error: 'enrolment not found'});
    }
    await conn.execute('UPDATE courses SET seats = seats + 1 WHERE id = ?', [req.params.courseId]);
    await conn.commit();
    res.status(204).end();
  } catch (err) {
    await conn.rollback();
    res.status(500).json({error: err.message});
  } finally {
    conn.release();
  }
};
