const pool = require('../db');

// ---------------------------------------------------------------------
// GET /courses            -> every course with its free seats
// GET /courses?day=Mon    -> Exercise 4: only the courses on that day
//
// This works now, but only returns the ordinary columns.
//
// TODO (Exercise 4), after you have added the details JSON column:
//   1. also return these fields from the JSON:
//        details->>'$.room' AS room,  details->>'$.day'  AS day,
//        details->>'$.time' AS time,  details->'$.tags'  AS tags
//      (->> gives plain text, -> keeps the JSON value, e.g. an array)
//   2. if req.query.day is given, add   WHERE details->>'$.day' = ?
//      and pass the day as a parameter - never glue it into the SQL.
// The front-end fills the Room / Day / Tags columns and the day filter
// automatically once these fields come back.
// ---------------------------------------------------------------------
exports.list = async (req, res) => {
  try {
    let sql = `SELECT id, title, credit, seats,
                details->>'$.room' AS room,
                details->>'$.day' AS day,
                details->>'$.time' AS time,
                details->'$.tags' AS tags
                FROM courses`;
    const params = [];
    if (req.query.day) {
      sql += " WHERE details->>'$.day' = ?";
      params.push(req.query.day);
    }
    sql += ' ORDER BY id';
    const [rows] = await pool.execute(sql, params);
    // const [rows] = await pool.execute(
    //   'SELECT id, title, credit, seats FROM courses ORDER BY id');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
