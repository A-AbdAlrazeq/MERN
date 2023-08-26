import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const ProductList = (props) => {
  const { product, setProduct } = props;

  useEffect(() => {
    fetchProducts();
    //to remove the warning about dependency
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

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

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/products");
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div>
      <h2>All Product</h2>
      {product.map((product, index) => {
        return (
          <div key={product._id}>
            {" "}
            <Link to={`/products/${product._id}`}>{product.title}</Link>
            <button onClick={() => handleDelete(product._id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
};
export default ProductList;
