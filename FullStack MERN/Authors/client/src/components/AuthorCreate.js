import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { TextField, Button, Typography, Container } from "@mui/material";
import axios from "axios";

const CreateAuthor = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [errors, setErrors] = useState([]);

  const handleCreateAuthor = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/authors", {
        name,
      });
      if (response.data._id) {
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Link to="/">Home</Link>
      <Typography variant="h4">Add a new author</Typography>
      <TextField
        label="Author Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <div>
        {errors.map((error, index) => (
          <div key={index}>
            <p color="">Error Message: {error.msg}</p>
          </div>
        ))}
      </div>
      <Button color="error" variant="contained" component={Link} to="/">
        Cancel
      </Button>
      <Button variant="contained" color="success" onClick={handleCreateAuthor}>
        Submit
      </Button>
    </Container>
  );
};

export default CreateAuthor;
