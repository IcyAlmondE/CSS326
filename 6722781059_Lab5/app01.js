const express = require('express');
const app = express()

app.get('/', (req, res) => {
    res.send('Hello from CSS326!');
});

app.listen(3000, () => console.log('http://localhost:3000'));

app.get('/hello', (req, res) => {
    res.send('plain text');
});

app.get('/data', (req, res) => {
    res.json({course: 'CSS326', year: 3});
});