// routes/books.routes.js
//
// GET / is wired for you as a worked example (Task 1). Add the remaining
// routes as you complete their controller functions (Tasks 2-5).
const router = require('express').Router();
const c = require('../controllers/books.controller');

router.get('/', c.list);          // GET /books        -> worked example

// TODO (Task 2, 1.5 pts): GET /books/:id -> c.getOne
router.get('/:id', c.getOne); // the route line is written for you; getOne itself is Task 2

// TODO (Task 3, 1.5 pts): POST /books -> c.create (with validation)
router.post('/', c.create);


// TODO (Task 4, 1.5 pts): PUT /books/:id -> c.update
router.put('/:id', c.update);


// TODO (Task 5, 1.5 pts): DELETE /books/:id -> c.remove
router.delete('/:id', c.remove);


module.exports = router;
