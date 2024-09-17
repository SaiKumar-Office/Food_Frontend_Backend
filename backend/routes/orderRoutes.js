const express = require('express');
const router = express.Router();
const { getOrderStatus, updateOrderStatus, createOrder } = require('../controllers/orderController');

// Route to get the status of a specific order
router.get('/:orderId/status', getOrderStatus);

// Route for admin to update the order status
router.put('/:orderId/status', updateOrderStatus);

// Create a new order
router.post('/orders', createOrder);

module.exports = router;
