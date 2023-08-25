const Product = require("../models/Product");

const createProduct = async (req, res) => {
  try {
    const { title, price, description } = req.body;
    const product = new Product({ title, price, description });
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error creating product" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const product = await Product.find();
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error fetching product details" });
  }
};
const getProductDetails = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error fetching product details" });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductDetails,
};
