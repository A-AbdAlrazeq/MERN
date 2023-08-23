import React, { useState } from "react";
import axios from "axios";

const ProductForm = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/products", {
        title,
        price,
        description,
      });
      console.log("Product created:", response.data);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };
  return (
    <div>
      <h2>Create a New Product</h2>
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
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default ProductForm;
