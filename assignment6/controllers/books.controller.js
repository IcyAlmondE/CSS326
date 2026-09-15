// controllers/books.controller.js
//
// exports.list is done as a worked example of the pool -> query -> JSON
// pattern used throughout. books( id, title, author, price, stock ).
const pool = require('../db');

// GET /books  -- worked example
exports.list = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM books');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /books/:id                                          Task 2 (1.5 pts)
// TODO: query the pool for the book with this id (? placeholder on
// req.params.id). If no row comes back, respond 404 with a JSON error.
exports.getOne = async (req, res) => {
  // TODO
  try{
    const [rows] = await pool.execute('SELECT * FROM books WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({error: 'not found'});
    res.json(rows);
  } catch(err){
    res.status(500).json({error: err.message});
  }
};

// POST /books                                              Task 3 (1.5 pts)
// TODO:
//   1. Read { title, author, price, stock } from req.body.
//   2. If title is missing, respond 400 with a message.
//   3. If price is not a positive number, respond 400 with a message.
//   4. Otherwise INSERT the book with ? placeholders and respond 201 with
//      the new id.
exports.create = async (req, res) => {
  // TODO
  try{
    let {title, author, price, stock} = req.body;
    price = parseFloat(price);
    if (!title) return res.status(400).json({error: 'title is required'});
    if (!Number.isFinite(price) || price < 0) return res.status(400).json({error: 'price must be greater than 0'});

    const [rows] = await pool.execute('INSERT INTO books (title, author, price, stock) VALUES (?, ?, ?, ?)', [title, author, price, stock]);
    res.status(201).json({id: rows.insertId});
  } catch(err) {
    res.status(500).json({error: err.message});
  }
};

// PUT /books/:id                                           Task 4 (1.5 pts)
// TODO: UPDATE the book's price and/or stock (from req.body) WHERE
// id = req.params.id, using ? placeholders. Respond 404 if affectedRows
// is 0, otherwise report how many rows were updated.
exports.update = async (req, res) => {
  // TODO
  try{
    const [rows] = await pool.execute('UPDATE books SET price = ? WHERE id = ?', [req.body.price, req.params.id]);
    if(rows.affectedRows === 0) return res.status(404).json({error: 'not found'});
    res.status(201).json({updated: rows.affectedRows})
  } catch(err){
    res.status(500).json({error: err.message});
  }
};

// DELETE /books/:id                                        Task 5 (1.5 pts)
// TODO: DELETE the book WHERE id = req.params.id, using a ? placeholder.
// Respond 404 if affectedRows is 0, otherwise respond 204.
exports.remove = async (req, res) => {
  // TODO
  try{
    const [rows] = await pool.execute('DELETE FROM books WHERE id = ?', [req.params.id]);
    if(rows.affectedRows === 0) return res.status(404).json({error: 'not found'});
    res.status(204).json({updated: rows.affectedRows})
  } catch(err){
    res.status(500).json({error: err.message});
  }
};
