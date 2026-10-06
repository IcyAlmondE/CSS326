// routes/students.routes.js — single-table CRUD plus nested course routes.
const router = require('express').Router();
const c = require('../controllers/students.controller');

router.get('/',        c.list);
router.get('/:id',     c.getOne);
router.post('/',       c.create);
router.put('/:id',     c.update);
router.delete('/:id',  c.remove);

// Lab 8 -- Exercise 2: GET /:id/courses    Exercise 4: POST /:id/courses and DELETE /:id/courses/:courseId
// add the nested routes here
router.get('/:id/courses', c.courses);

router.post('/:id/courses',             c.enrol);     // enrol in a course
router.delete('/:id/courses/:courseId', c.unenrol);   // un-enrol from a course

module.exports = router;
