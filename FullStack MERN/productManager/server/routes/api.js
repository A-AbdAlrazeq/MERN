// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Define the create product route
router.post('/products', productController.createProduct);

module.exports = router;
