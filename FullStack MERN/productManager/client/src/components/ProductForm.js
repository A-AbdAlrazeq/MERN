import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const ProductForm = ({ productToUpdate, onSubmit, addProductToList }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

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
        navigate(`/products/${productToUpdate._id}`);
      } else {
        const response = await axios.post(
          "http://localhost:8000/api/products",
          formData
        );
        addProductToList(response.data);
        setTitle("");
        setPrice("");
        setDescription("");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>{productToUpdate ? "Edit" : "Create"} Product</h2>
      <form style={{ padding: "10px" }} onSubmit={handleSubmit}>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          {" "}
          <div>
            <TextField
              label="Title"
              variant="outlined"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <TextField
              label="Price"
              variant="outlined"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div>
            <TextField
              label="description"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </Box>
        <Button variant="contained" color="success" type="submit">
          {productToUpdate ? "Save Changes" : "Create Product"}
        </Button>
      </form>
    </div>
  );
};

export default ProductForm;
