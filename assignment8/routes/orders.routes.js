// routes/orders.routes.js
const router = require('express').Router();
const c = require('../controllers/orders.controller');

// Lab 8 -- Task 1: router.get('/details', c.details);
router.get('/details', c.details);

// Lab 8 -- Task 3: router.get('/view', c.view);
router.get('/view', c.view);

module.exports = router;
