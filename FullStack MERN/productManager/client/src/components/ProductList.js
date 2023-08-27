import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DeleteButton from "./DeleteButton";
const ProductList = (props) => {
  const { product, setProduct } = props;

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:8000/api/products/${productId}`);
      //fetchProducts(); Refresh the list after deletion
      // Update products state by removing the deleted product
      setProduct(product.filter((product) => product._id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div>
      <h2>All Product</h2>
      {product.map((productItem, index) => {
        return (
          <div key={productItem._id}>
            {" "}
            <Link to={`/products/${productItem._id}`}>{productItem.title}</Link>
            <DeleteButton onClick={() => handleDelete(productItem._id)} />
          </div>
        );
      })}
    </div>
  );
};
export default ProductList;
