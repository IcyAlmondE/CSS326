// routes/students.routes.js — single-table CRUD plus nested course routes.
const router = require('express').Router();
const c = require('../controllers/students.controller');

router.get('/',        c.list);
router.get('/:id',     c.getOne);
router.post('/',       c.create);
router.put('/:id',     c.update);
router.delete('/:id',  c.remove);

// --- nested resource: a student's courses (the many-to-many link) ---
router.get('/:id/courses',            c.courses);   // list this student's courses
router.post('/:id/courses',           c.enrol);     // enrol in a course
router.delete('/:id/courses/:courseId', c.unenrol); // un-enrol from a course

module.exports = router;
