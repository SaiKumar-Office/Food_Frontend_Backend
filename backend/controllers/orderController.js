const Order = require('../models/Order');

// Get order status by order ID
const getOrderStatus = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ status: order.status });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving order status', error });
  }
};

// Update order status by admin
const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body; // Admin sends new status in request body

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status; // Update the status
    await order.save();

    res.json({ message: 'Order status updated', status: order.status });
  } catch (error) {
    res.status(500).json({ message: 'Error updating order status', error });
  }
};
const createOrder = async (req, res) => {
  try {
    const { userId, items, totalPrice } = req.body;
    const order = new Order({ userId, items, totalPrice });
    await order.save();
    res.status(201).json({ message: 'Order created', order });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
};

module.exports = {
  getOrderStatus,
  updateOrderStatus,
  createOrder
};
