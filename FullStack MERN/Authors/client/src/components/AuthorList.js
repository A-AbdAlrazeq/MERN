import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DeleteButton from "./DeleteButton";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
const AuthorList = (props) => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  const [author, setAuthor] = useState([]);

  useEffect(() => {
    fetchProducts(); // Fetch products when the component mounts
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/authors");
      setAuthor(response.data.sort((a, b) => a.name.localeCompare(b.name)));
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  const handleDelete = async (authorId) => {
    try {
      await axios.delete(`http://localhost:8000/api/authors/${authorId}`);
      //fetchProducts(); Refresh the list after deletion
      // Update products state by removing the deleted product
      setAuthor(author.filter((author) => author._id !== authorId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div>
      <h2>Favorite Authors</h2>
      <Link to="/create">Add an author</Link>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Author</StyledTableCell>
              <StyledTableCell>Action Available</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {author.map((authorItem) => (
              <StyledTableRow key={authorItem._id}>
                <StyledTableCell component="th" scope="row">
                  {authorItem.name}
                </StyledTableCell>
                <StyledTableCell
                  style={{ display: "inline-block", marginRight: "10px" }}
                >
                  <DeleteButton onClick={() => handleDelete(authorItem._id)} />
                  <Button
                    component={Link} // Use Link component
                    to={`/edit/${authorItem._id}`} // Pass author ID as parameter
                    variant="outlined"
                  >
                    Edit
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default AuthorList;
