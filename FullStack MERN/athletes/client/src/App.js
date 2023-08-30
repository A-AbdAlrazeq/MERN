import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexView from "./views/IndexView";
import CreateView from "./views/CreateView";
import DetailView from "./views/DetailView";
import EditView from "./views/EditView";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<IndexView />} path="/" default />
          <Route element={<CreateView />} path="/create" />
          <Route element={<DetailView />} path="/:id" />
          <Route element={<EditView />} path="/:id/edit" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
