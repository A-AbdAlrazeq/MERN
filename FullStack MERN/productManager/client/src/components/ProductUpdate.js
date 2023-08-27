// ProductEdit.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductForm from "./ProductForm";
import axios from "axios";

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const handleSubmit = async () => {
    try {
      // Handle successful submission
      navigate(`/products/${id}`); // Redirect to product details
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div>
      <ProductForm productToUpdate={productToUpdate} onSubmit={handleSubmit} />
    </div>
  );
};

export default ProductEdit;
