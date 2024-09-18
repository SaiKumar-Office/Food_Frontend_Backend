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
// Update order status by order ID
const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.status = status;
    await order.save();

    res.status(200).json({ status: order.status });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating order status' });
  }
};

const createOrder = async (req, res) => {
  try {
    const { userId, items, totalPrice } = req.body;

    if (!userId || !items || !totalPrice) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const order = new Order({ user: userId, products: items, totalAmount: totalPrice });
    await order.save();
    res.status(201).json({ message: 'Order created', order });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

const getAllOrdersByUser = async (req, res) => {
  const { userId } = req.params; // Extract userId from the request params
  try {
      // Find all orders for the specific user and populate related fields (like products, if necessary)
      const orders = await Order.find({ user: userId }).populate('products');
      
      // If no orders found, return a 404 status
      if (!orders || orders.length === 0) {
          return res.status(404).json({ message: "No orders found for this user" });
      }

      // Return the fetched orders
      res.status(200).json(orders);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    // Fetch all orders from the database, populating product details for each order
    const orders = await Order.find().populate('products.productId');

    // If no orders are found, return a 404 status
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    // Return the fetched orders
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getAllOrdersByFirm = async (req, res) => {
  try {
    // Get the firmId from the request params or user info (based on how you manage firm authentication)
    const { firmId } = req.params;

    // Fetch all orders from the database that belong to the specific firm, populating product details
    const orders = await Order.find({ firmId }).populate('products.productId');

    // If no orders are found for the firm, return a 404 status
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this firm" });
    }

    // Return the fetched orders
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};







module.exports = {
  getOrderStatus,
  updateOrderStatus,
  createOrder,
  getAllOrdersByUser,
  getAllOrders,
  getAllOrdersByFirm
};
