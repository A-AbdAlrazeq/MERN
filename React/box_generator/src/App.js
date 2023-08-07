import "./App.css";
import React, { useState } from "react";
import BoxGenerator from "./components/boxGenerator";

function App() {
  const [boxes, setBoxes] = useState([]);

  const handleAddBox = (newBox) => {
    setBoxes([...boxes, newBox]);
  };
  return (
    <div className="App">
      <BoxGenerator onAddBox={handleAddBox} />
      <div className="box">
        {boxes.map((box, index) => (
          <div
            key={index}
            style={{
              backgroundColor: box.color,
              width: box.width,
              height: box.height,
              margin: "5px",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
