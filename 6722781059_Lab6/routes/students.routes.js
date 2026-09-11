// routes/students.routes.js
//
// Exercise 1: GET / is wired for you as a worked example -- follow the same
//             pattern to confirm GET /students still works after your refactor.
// Exercise 2: add PUT /:id and DELETE /:id once their controller functions exist.
const router = require('express').Router();
const c = require('../controllers/students.controller');

router.get('/', c.list);          // GET /students          -> worked example
router.get('/:id', c.getOne);     // GET /students/:id       -> TODO in controller

router.post('/', c.create);       // POST /students          -> TODO: add validation (Ex. 2)

// TODO (Exercise 2): add the update route
router.put('/:id', c.update);

// TODO (Exercise 2): add the remove route
router.delete('/:id', c.remove);

module.exports = router;
