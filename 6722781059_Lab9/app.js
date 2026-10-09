// app.js — mount the students and courses routers, serve the front-end.
// Setup: run sql/lab_9.sql in Workbench, then npm install (once) and node app.js
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use('/students', require('./routes/students.routes'));
app.use('/courses',  require('./routes/courses.routes'));
app.listen(3000, () => console.log('Lab 9 server on http://localhost:3000'));
