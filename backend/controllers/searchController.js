const Product = require('../models/Products'); // Assuming you have a Product model
const Restaurant = require('../models/Firm'); // Assuming you have a Restaurant model

// Search for products or restaurants based on the query
const search = async (req, res) => {
  try {
    const query = req.query.query;

    // Find products and restaurants that match the query
    // const products = await Product.find({
    //   productName: { $regex: query, $options: 'i' }
    // });

    const restaurants = await Restaurant.find({
      firmName: { $regex: query, $options: 'i' }
    });

    // Combine results from both products and restaurants
    const results = [...restaurants];

    // ...products
    res.status(200).json(results);
  } catch (error) {
    console.error('Error during search:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { search };
