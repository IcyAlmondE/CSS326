// routes/courseRoutes.js
const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

router.get('/', courseController.getAll);
router.get('/search', courseController.search);

module.exports = router;
