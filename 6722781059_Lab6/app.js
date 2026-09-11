// app.js
// This wiring is done for you. You should not need to change this file
// for Exercises 1-4 -- everything else plugs into it.
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));   // serves public/index.html, style.css, main.js

const studentsRouter = require('./routes/students.routes');
app.use('/students', studentsRouter);

const PORT = 6767;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
