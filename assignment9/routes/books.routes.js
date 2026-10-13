// routes/books.routes.js
const router = require('express').Router();
const c = require('../controllers/books.controller');

router.get('/', c.list);
router.get('/:id', c.getOne);

module.exports = router;
