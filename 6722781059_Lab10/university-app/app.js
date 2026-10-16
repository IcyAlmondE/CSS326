// app.js
const express = require('express');
const path = require('path');

const courseRoutes = require('./routes/courseRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/courses', courseRoutes);
app.use('/api/students', studentRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
