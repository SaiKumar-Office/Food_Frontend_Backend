const express = require('express')
const productController = require('../controllers/productController');
const router = express.Router();


router.post('/add-product/:firmId',productController.addProduct);
router.get('/:firmId/products', productController.getProductByFirm);
// router.get('/:firmId/products', productController.getProductById);
router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.header('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
});
router.delete('/:productId', productController.deleteProductById);
router.post('/decrease-quantity', productController.decreaseProductQuantity);
router.post('/update-quantity', productController.updateProductQuantity);
// router.get('/search', productController.searchProducts);

module.exports = router;