// controllers/students.controller.js
//
// exports.list is done as a worked example of the pattern: import the pool,
// query it, send JSON, catch errors. Use this same pattern for the rest.
const pool = require('../db');

// GET /students  -- worked example
exports.list = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM students');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /students/:id
// TODO: query the pool for the student with this id (use req.params.id and a
// ? placeholder). If no row comes back, respond 404 with a JSON error message.
exports.getOne = async (req, res) => {
  // TODO - Exercise 1
  try {
    const [rows] = await pool.execute('SELECT * FROM students WHERE id = ?', [req.params.id]);
    res.json(rows);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /students
// TODO (Exercise 2 - validation):
//   1. Read { name, major, year } from req.body.
//   2. If name or major is missing, respond 400 with a helpful error message.
//   3. If year is not an integer from 1 to 4, respond 400 with a helpful error message.
//   4. Otherwise INSERT the new student with ? placeholders and respond 201
//      with the new id.
exports.create = async (req, res) => {
  // TODO
  try {
    const {name, major, year} = req.body;

    if (!name || !major) return res.status(400).json({error: 'name and major are required'});
    if (!Number.isInteger(year) || year<1 || year>4) return res.status(400).json({error: 'year must be 1 to 4'});

    const [r] = await pool.execute('INSERT INTO students (name, major, year) VALUES (?, ?, ?)', [name, major, year]);
    res.status(201).json({id: r.insertId, name, major, year});
  } catch(err) {
    res.status(500).json({err: err.message});
  }
};

// PUT /students/:id
// TODO (Exercise 2):
//   1. UPDATE the student's major (from req.body) WHERE id = req.params.id,
//      using a ? placeholder.
//   2. If affectedRows is 0, respond 404 (nothing matched that id).
//   3. Otherwise respond with how many rows were updated.
exports.update = async (req, res) => {
  // TODO
  try {
    const [r] = await pool.execute('UPDATE students SET major = ? WHERE id = ?', [req.body.major, req.params.id]);
    if (r.affectedRows === 0) return res.status(404).json({error: 'not found'});
    res.json({updated: r.affectedRows});
  } catch(err) {
    res.status(500).json({error: err.message});
  }
};

// DELETE /students/:id
// TODO (Exercise 2):
//   1. DELETE the student WHERE id = req.params.id, using a ? placeholder.
//   2. If affectedRows is 0, respond 404.
//   3. Otherwise respond 204 (no content).
exports.remove = async (req, res) => {
  // TODO
  try {
    const [r] = await pool.execute('DELETE FROM students WHERE id = ?', [req.params.id]);
    if (r.affectedRows === 0) return res.status(404).json({error: 'not found'});
    res.status(204).end();
  } catch(err) {
    res.status(500).json({error: err.message});
  }
};
