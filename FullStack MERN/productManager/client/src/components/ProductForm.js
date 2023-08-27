// ProductForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductForm = ({ productToUpdate, onSubmit, addProductToList }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (productToUpdate) {
      setTitle(productToUpdate.title);
      setPrice(productToUpdate.price);
      setDescription(productToUpdate.description);
    }
  }, [productToUpdate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { title, price, description };

    try {
      if (productToUpdate) {
        await axios.patch(
          `http://localhost:8000/api/products/${productToUpdate._id}`,
          formData
        );
      } else {
        const response = await axios.post(
          "http://localhost:8000/api/products",
          formData
        );
        addProductToList(response.data);
        console.log("Product created:", response.data);
        // Clear the form fields
        setTitle("");
        setPrice("");
        setDescription("");
      }

      if (onSubmit) {
        onSubmit();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>{productToUpdate ? "Edit" : "Create"} Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">
          {productToUpdate ? "Save Changes" : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
