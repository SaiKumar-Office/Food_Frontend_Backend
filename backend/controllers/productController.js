const Product = require('../models/Products');
const multer = require('multer');
const Firm = require('../models/Firm');
const path = require('path');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); 
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});
const upload = multer({ storage: storage });


const addProduct = async (req, res) => {
    try {
        const { productName, price, category, bestSeller, description, availableQuantity } = req.body; // Include availableQuantity
        const image = req.file ? req.file.filename : undefined;

        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);

        if (!firm) {
            return res.status(404).json({ error: "No firm found" });
        }

        const product = new Product({
            productName,
            price,
            category,
            bestSeller,
            description,
            image,
            availableQuantity,
            firm: firm._id
        });

        const savedProduct = await product.save();
        firm.products.push(savedProduct);
        await firm.save();

        res.status(200).json(savedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get products by firm
const getProductByFirm = async (req, res) => {
    try {
        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);

        if (!firm) {
            return res.status(404).json({ error: "No FIRM Found" });
        }

        const restaurantName = firm.firmName;
        const products = await Product.find({ firm: firmId });
        res.status(200).json({ restaurantName, products });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
// const getProductById = async (req, res) => {
//     try {
//       const product = await Product.findById(req.params.productId);
//       if (!product) {
//         return res.status(404).json({ error: 'Product not found' });
//       }
//       res.status(200).json({ product });
//     } catch (error) {
//       res.status(500).json({ error: 'Internal server error' });
//     }
// };



// Delete product by ID
const deleteProductById = async (req, res) => {
    try {
        const productId = req.params.productId;
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ error: "No product found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Update the availableQuantity when a product is added to the cart
// Controller to decrease the quantity of a product
const decreaseProductQuantity = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
      const product = await Product.findById(productId);

      if (!product) {
          return res.status(404).json({ error: 'Product not found' });
      }

      // Check if the available quantity is sufficient
      if (product.availableQuantity < -quantity) {
          return res.status(400).json({ error: 'Not enough stock available' });
      }

      // Decrease the available quantity
      product.availableQuantity += quantity; // Note: quantity should be negative for decrease
      await product.save();

      res.status(200).json({ message: 'Quantity updated successfully', availableQuantity: product.availableQuantity });
  } catch (error) {
      console.error('Error decreasing product quantity:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};

const updateProductQuantity = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
      const product = await Product.findById(productId);

      if (!product) {
          return res.status(404).json({ error: 'Product not found' });
      }

      // Update the available quantity
      product.availableQuantity += quantity; // If quantity is positive, increase; if negative, decrease

      // Check if quantity becomes negative
      if (product.availableQuantity < 0) {
          return res.status(400).json({ error: 'Not enough stock available' });
      }

      await product.save();

      res.status(200).json({ availableQuantity: product.availableQuantity });
  } catch (error) {
      console.error('Error updating product quantity:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};

// Backend product search controller
// Backend product search controller
// Example search controller in searchController.js
const searchProducts = async (req, res) => {
    const query = req.query.query; // Search query sent from the frontend

    try {
        // Search for products that match the query and populate the firm (restaurant) details
        const products = await Product.find({ productName: new RegExp(query, 'i') })
            .populate('firm', 'firmName'); // Assuming 'firm' field is linked to the Firm collection

        // Return both product and firm details
        res.status(200).json(products);
    } catch (error) {
        console.error("Search failed", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getFirmWithProducts = async (firmId) => {
    try {
        const firm = await Firm.findById(firmId)
            .populate('products', 'productName price description'); // Populate productName, price, description
        console.log(firm);
        return firm;
    } catch (error) {
        console.error('Error fetching firm with products:', error);
    }
};





module.exports = { 
    addProduct: [upload.single('image'), addProduct], 
    getProductByFirm, 
    deleteProductById ,
    decreaseProductQuantity,
    updateProductQuantity, 
    searchProducts,    
    getFirmWithProducts

};
// getProductById,
