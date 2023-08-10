import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
/* import NumberDisplay from "./components/NumberDisplay";
import WordDisplay from "./components/WordDisplay";
import ColoredWordDisplay from "./components/ColoredWordDisplay"; */
import ParamsComponent from "./components/ColoredWordDisplay";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />

        <Route element={<ParamsComponent />} path="/:word" />

        <Route element={<ParamsComponent />} path="/:word/:color/:bgCol" />
        <Route element={<ParamsComponent />} path="/:word/:color" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
