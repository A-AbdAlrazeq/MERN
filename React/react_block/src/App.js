import "./App.css";
import React from "react";
import Header from "./components/Plotting Our React Blocks/Header";
import Navigation from "./components/Plotting Our React Blocks/Navigation";
import Main from "./components/Plotting Our React Blocks/Main";
import SubContents from "./components/Plotting Our React Blocks/SubContents";
import Advertisement from "./components/Plotting Our React Blocks/Advertisement";

function App() {
  return (
    <div className="App">
      <Header />
      <Navigation />
      <Main>
        <SubContents />
        <SubContents />
        <SubContents />
        <Advertisement />
      </Main>
    </div>
  );
}

export default App;
