const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Create a new order
router.post('/orders', orderController.createOrder);

// Get order status by order ID
router.get('/:orderId/status', orderController.getOrderStatus);

// Update order status by admin
router.put('/:orderId/status', orderController.updateOrderStatus);

// Get all orders by user ID
router.get('/user/:userId', orderController.getAllOrdersByUser);

// get all orders
router.get('/all-orders', orderController.getAllOrders);

// Route to get orders by firm ID
router.get('/firm/:firmId', orderController.getAllOrdersByFirm);

module.exports = router;
