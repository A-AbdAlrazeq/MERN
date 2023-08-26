// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Define the create product route
router.post("/products", productController.createProduct);
router.get("/products", productController.getAllProducts);
router.get("/products/:id", productController.getProductDetails);

// Route to edit a product by ID
router.patch("/products/:id", productController.editProduct);

// Route to delete a product by ID
router.delete("/products/:id", productController.deleteProduct);

module.exports = router;
