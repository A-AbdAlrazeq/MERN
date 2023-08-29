import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { TextField, Button, Typography, Container } from "@mui/material";
import axios from "axios";

const UpdateAuthor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [authorName, setAuthorName] = useState("");
  const [errors, setErrors] = useState([]);
  const [notFound, setNotFound] = useState(false); // State for handling not found id

  useEffect(() => {
    fetchAuthorDetails();
  }, [id]);

  const fetchAuthorDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/authors/${id}`
      );
      setAuthorName(response.data.name);
    } catch (error) {
      console.error("Error fetching author details:", error);
      setNotFound(true); // Set notFound state if author not found
    }
  };

  const handleUpdateAuthor = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/authors/${id}`,
        {
          name: authorName,
        }
      );

      if (response.status === 200) {
        navigate("/"); // Navigate to the authors list page
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error("Error updating author:", error);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Update Author</Typography>
      <Link to="/">Home</Link>
      {notFound ? (
        <div>
          <p>
            We're sorry, but we could not find the author you are looking for.
          </p>
          <p>Would you like to add this author to our database?</p>
          <Button
            variant="contained"
            color="success"
            component={Link}
            to="/create"
          >
            Create Author
          </Button>
        </div>
      ) : (
        <>
          <TextField
            label="Author Name"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
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
          <Button
            variant="contained"
            color="success"
            onClick={handleUpdateAuthor}
          >
            Save Changes
          </Button>
        </>
      )}
    </Container>
  );
};

export default UpdateAuthor;
