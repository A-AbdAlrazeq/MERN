import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./views/Main";
import Detail from "./components/ProductDetail";
import ProductUpdate from "./components/ProductUpdate";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<Main />} path="/" default />
          <Route element={<Detail />} path="/products/:id" />
          <Route element={<ProductUpdate />} path="/edit/:id" />
          {/* Edit product route */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
