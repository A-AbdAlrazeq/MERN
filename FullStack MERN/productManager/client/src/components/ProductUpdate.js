// ProductEdit.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductForm from "./ProductForm";
import axios from "axios";

const ProductEdit = () => {
  const { id } = useParams();
  const [productToUpdate, setProductToUpdate] = useState(null);

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/products/${id}`
      );
      setProductToUpdate(response.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  return (
    <div>
      <ProductForm productToUpdate={productToUpdate} />
    </div>
  );
};

export default ProductEdit;
