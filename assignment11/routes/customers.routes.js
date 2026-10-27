// routes/customers.routes.js
const router = require('express').Router();
const c = require('../controllers/customers.controller');

router.get('/', c.list);
router.get('/:id/orders', c.listOrders);
router.post('/:id/orders', c.placeOrder);
router.delete('/:id/orders/:orderId', c.cancelOrder);

module.exports = router;
