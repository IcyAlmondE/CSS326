const express = require('express');
const mysql = require('mysql2/promise');
const app = express();

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'Earth-2549',
    database: 'lab_5'
};

app.get('/students', async (req, res) => {
  const conn = await mysql.createConnection(dbConfig);
  const [rows] = await conn.query('SELECT * FROM students');
  await conn.end();
  res.json(rows);
});

// Exercise 1
app.get('/', (req, res) => res.send('Welcome message'));
console.log('http://localhost:3000');
app.listen(42069);

// Exercise 2
app.get('/students/:id', async (req, res) => {
    const conn = await mysql.createConnection(dbConfig);
    try{
        const [rows] = await conn.execute('SELECT * FROM students WHERE id = ?', [req.params.id]);
        if(rows.length===0) return res.status(404).json({error: 'not found'});
        res.json(rows[0]);
        
    } catch(err){
        res.status(500).json({error: err.message});
    }
    await conn.end();
});

// Exercies 3
app.use(express.json());

app.post('/students', async (req, res) => {
    const conn = await mysql.createConnection(dbConfig);
    const {name, major, year} = req.body;
    try{
        const [r] = await conn.execute('INSERT INTO students (name, major, year) VALUES (?, ?, ?)', [name, major, year]);
        res.status(201).json({id: r.insertId});
    } catch(err){
        res.status(500).json({error: err.message});
    }
});

// Exercise 4
app.use(express.static('public'));