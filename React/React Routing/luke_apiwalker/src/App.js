import "./App.css";
import Form from "./components/Form";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import People from "./components/People";
import Planets from "./components/Planets";
import React from "react";

function App() {
  return (
    <Router>
      <div style={{ margin: "20px" }}>
        <Form />
        <Routes>
          <Route path="/people/:id" element={<People />} />
          <Route path="/planets/:id" element={<Planets />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
