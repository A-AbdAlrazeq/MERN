import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./views/Main";
import Detail from "./components/ProductDetail";
// import PersonForm from './components/PersonForm';
// import PersonList from './components/PersonList';
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<Main />} path="/" default />
          <Route element={<Detail />} path="/products/:id" />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
