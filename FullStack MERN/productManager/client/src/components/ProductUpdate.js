import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  // ...

  useEffect(() => {
    async function fetchProductDetails() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/products/${id}`
        );
        setTitle(response.data.title);
        setPrice(response.data.price);
        setDescription(response.data.description);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    }

    fetchProductDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:8000/api/products/${id}`, {
        title,
        price,
        description,
      });
      navigate(`/products/${id}`); // Redirect to product details
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // ...

  return (
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <p>
          <label>Title</label>
          <br />
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </p>
        <p>
          <label>Price</label>
          <br />
          <input
            type="number"
            name="price"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </p>
        <p>
          <label>description</label>
          <br />
          <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </p>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default ProductEdit;
