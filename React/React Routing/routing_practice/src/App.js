import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import NumberDisplay from "./components/NumberDisplay";
import WordDisplay from "./components/WordDisplay";
import ColoredWordDisplay from "./components/ColoredWordDisplay";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/:num" element={<NumberDisplay />} />
        <Route path="/:word" element={<WordDisplay />} />
        <Route
          path="/:word/:textColor/:bgColor"
          element={<ColoredWordDisplay />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
