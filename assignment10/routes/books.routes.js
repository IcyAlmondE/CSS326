// routes/books.routes.js
const router = require('express').Router();
const c = require('../controllers/books.controller');

router.get('/', c.list);
router.get('/search', c.searchByAuthor);   // keep this above '/:id', or "search" is read as an id
router.get('/:id', c.getOne);

module.exports = router;
