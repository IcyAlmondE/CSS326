// controllers/books.controller.js
const pool = require('../db');

// Log details on the server; send only a generic message to the client.
function fail(res, err) {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong. Please try again later.' });
}

// ---------------------------------------------------------------------
// GET /books                -> every book with its stock (the first 20, as in Lab 10)
// GET /books?format=ebook   -> Q7: only the books in that format
//
// This works now, but only returns the ordinary columns.
//
// TODO (Q7), after Q6 has added the attributes JSON column:
//   1. also return   attributes->>'$.format' AS format,
//                    attributes->>'$.pages'  AS pages
//   2. if req.query.format is given, add   WHERE attributes->>'$.format' = ?
//      and pass the format as a parameter.
// The front-end fills the Format / Pages columns and the filter once
// these fields come back.
// ---------------------------------------------------------------------
exports.list = async (req, res) => {
  try {
    let sql = `SELECT id, title, author, price, stock, attributes->>'$.format' AS format, attributes->>'$.pages' AS pages FROM books`;
    const params = [];
    if(req.query.format){
      sql += ` WHERE attributes->>'$.format' = ?`;
      params.push(req.query.format);
    }
    sql += ` ORDER BY id LIMIT 20`;
    const [rows] = await pool.execute(sql, params);
    res.json(rows);
  } catch (err) {
    fail(res, err);
  }
};

// GET /books/:id
exports.getOne = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM books WHERE id = ?', [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'not found' });
    res.json(rows[0]);
  } catch (err) {
    fail(res, err);
  }
};

// GET /books/search?author=...
exports.searchByAuthor = async (req, res) => {
  try {
    const author = req.query.author || '';
    // Lab 10 Q5: a ? placeholder keeps the value apart from the SQL.
    const [rows] = await pool.execute(
      'SELECT id, title, author, price FROM books WHERE author = ?',
      [author]
    );
    res.json(rows);
  } catch (err) {
    fail(res, err);
  }
};
