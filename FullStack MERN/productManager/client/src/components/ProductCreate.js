import React from "react";
import ProductForm from "./ProductForm";

const ProductCreate = ({ onSubmit }) => {
  return (
    <div>
      <ProductForm onSubmit={onSubmit} />
    </div>
  );
};
export default ProductCreate;
