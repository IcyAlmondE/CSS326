const pool = require('../db');

// GET /students/:id/enrolments  (done for you)
exports.listForStudent = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `SELECT c.id AS course_id, c.title, e.grade
         FROM enrolments e JOIN courses c ON c.id = e.course_id
        WHERE e.student_id = ? ORDER BY c.id`,
      [req.params.id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---------------------------------------------------------------------
// POST /students/:id/enrolments      body: { "course_id": 3 }
//
// This is the Lab 9 transactional enrol: Node takes the seat itself
// (guarded UPDATE) and then inserts the enrolment. It works today.
//
// But after Exercise 2 your AFTER INSERT trigger ALSO takes a seat, so
// one enrolment costs TWO seats - try it and watch the log.
//
// TODO (Exercise 3): replace the whole transaction with ONE call to your
// stored procedure:
//     await pool.execute('CALL enrol_student(?, ?)', [studentId, courseId]);
// and keep the error handling, adding one case:
//     err.sqlState === '45000'  -> 409 with err.sqlMessage  ('course is full',
//                                  raised by SIGNAL in your trigger)
//   201 -> enrolled   409 -> full / already enrolled   404 -> no such student
// ---------------------------------------------------------------------
exports.enrol = async (req, res) => {
  const studentId = Number(req.params.id);
  const courseId = Number(req.body.course_id);
  if (!Number.isInteger(studentId) || !Number.isInteger(courseId)) {
    return res.status(400).json({ error: 'student id and course_id must be integers' });
  }

  try {
    await pool.execute('CALL enrol_student(?, ?)', [studentId, courseId]);
    res.status(201).json({ ok: true, student_id: studentId, course_id: courseId });
  } catch (err) {
    if (err.sqlState === '45000') {                    // our SIGNAL from the trigger
      return res.status(409).json({ error: err.sqlMessage });
    }
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'student is already enrolled in this course' });
    }
    if (err.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(404).json({ error: 'student or course not found' });
    }
    res.status(500).json({ error: err.message });
  }
  // const conn = await pool.getConnection();
  // try {
  //   await conn.beginTransaction();
  //   const [u] = await conn.execute(
  //     'UPDATE courses SET seats = seats - 1 WHERE id = ? AND seats > 0',
  //     [courseId]);
  //   if (u.affectedRows === 0) {
  //     await conn.rollback();
  //     return res.status(409).json({ error: 'course is full' });
  //   }
  //   await conn.execute(
  //     'INSERT INTO enrolments (student_id, course_id) VALUES (?, ?)',
  //     [studentId, courseId]);
  //   await conn.commit();
  //   res.status(201).json({ ok: true, student_id: studentId, course_id: courseId });
  // } catch (err) {
  //   await conn.rollback();
  //   if (err.code === 'ER_DUP_ENTRY') {
  //     return res.status(409).json({ error: 'student is already enrolled in this course' });
  //   }
  //   if (err.code === 'ER_NO_REFERENCED_ROW_2') {
  //     return res.status(404).json({ error: 'student or course not found' });
  //   }
  //   res.status(500).json({ error: err.message });
  // } finally {
  //   conn.release();
  // }
};

// ---------------------------------------------------------------------
// DELETE /students/:id/enrolments/:courseId
//
// The Lab 9 transactional cancel: DELETE, then give the seat back.
// After Exercise 2 your AFTER DELETE trigger also gives the seat back,
// so one cancel would return TWO seats.
//
// TODO (Exercise 3): keep only the DELETE (no transaction needed, the
// trigger does the rest). Still return 404 when affectedRows is 0.
// ---------------------------------------------------------------------
exports.unenrol = async (req, res) => {
  const studentId = Number(req.params.id);
  const courseId = Number(req.params.courseId);
  if (!Number.isInteger(studentId) || !Number.isInteger(courseId)) {
    return res.status(400).json({ error: 'ids must be integers' });
  }

  try {
    const [d] = await pool.execute(
      'DELETE FROM enrolments WHERE student_id = ? AND course_id = ?',
      [studentId, courseId]);
    if (d.affectedRows === 0) return res.status(404).json({ error: 'enrolment not found' });
    res.json({ ok: true, student_id: studentId, course_id: courseId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
