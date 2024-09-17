const express = require('express');
const router = express.Router();
const { search ,searchProductsWithFirm } = require('../controllers/searchController');


router.get('/search',search)
// router.get('/search', searchProductsWithFirm);

module.exports = router;
