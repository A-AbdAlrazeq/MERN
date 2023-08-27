import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./views/Main";
import ProductDetail from "./components/ProductDetail";
import ProductUpdate from "./components/ProductUpdate";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<Main />} path="/" />
          <Route element={<ProductDetail />} path="/products/:id" />
          <Route element={<ProductUpdate />} path="/edit/:id" />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
