import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthorList from "./components/AuthorList";
import CreateAuthor from "./components/AuthorCreate";
import AuthorUpdate from "./components/AuthorUpdate";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthorList />} path="/" />
          <Route element={<CreateAuthor />} path="/create" />
          <Route element={<AuthorUpdate />} path="/edit/:id" />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
