// ProductDetail.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DeleteButton from "./DeleteButton";

const ProductDetail = (props) => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    fetchProduct();
  }, [id]);
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/products/${id}`);
      navigate("/"); // Redirect to main view after deletion
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/products/" + id
      );
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button onClick={() => navigate(`/`)}>Home</button>
      <h2>Product Details</h2>
      <p>Title: {product.title}</p>
      <p>Price: {product.price}</p>
      <p>Description: {product.description}</p>
      <DeleteButton onClick={() => handleDelete(product._id)} />
      <button onClick={() => navigate(`/edit/${id}`)}>Edit</button>
    </div>
  );
};

export default ProductDetail;
