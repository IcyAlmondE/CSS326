const router = require('express').Router();
const c = require('../controllers/courses.controller');
router.get('/', c.list);   // all courses (used to populate the enrol select)
module.exports = router;
