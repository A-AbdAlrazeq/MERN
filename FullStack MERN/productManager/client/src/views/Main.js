// Main.js
import React, { useState, useEffect } from "react";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import axios from "axios";

const Main = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetchProducts(); // Fetch products when the component mounts
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/products");
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const addProductToList = (newProduct) => {
    setProduct([...product, newProduct]);
  };

  return (
    <div>
      <ProductForm addProductToList={addProductToList} />
      <hr />
      <ProductList product={product} setProduct={setProduct} />
    </div>
  );
};

export default Main;
