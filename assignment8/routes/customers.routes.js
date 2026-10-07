// routes/customers.routes.js
const router = require('express').Router();
const c = require('../controllers/customers.controller');

router.get('/', c.list);
router.get('/:id', c.getOne);

// Lab 8 -- Task 5: router.post('/:id/orders', c.placeOrder);
router.post('/:id/orders', c.placeOrder);

// Lab 8 -- Task 6: router.delete('/:id/orders/:orderId', c.cancelOrder);
router.delete('/:id/orders/:orderId', c.cancelOrder);

module.exports = router;
