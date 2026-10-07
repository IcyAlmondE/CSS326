// routes/books.routes.js
const router = require('express').Router();
const c = require('../controllers/books.controller');

router.get('/', c.list);
// Task 2: register router.get('/never-ordered', ...) HERE, before '/:id' -- Express tries routes in order.
router.get('/never-ordered', c.never);
router.get('/:id', c.getOne);
router.post('/', c.create);
router.put('/:id', c.update);
router.delete('/:id', c.remove);

module.exports = router;
