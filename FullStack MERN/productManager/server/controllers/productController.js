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

module.exports = {
  createProduct,
};
