/* import PersonCard from "./components/PersonCard"; */
import "./App.css";
import React, { useState } from "react";
/* import Form from "./components/form"; */
import BoxGenerator from "./components/boxGenerator";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  const [boxes, setBoxes] = useState([]);

  const handleAddBox = (newBox) => {
    setBoxes([...boxes, newBox]);
  };
  return (
    /*  <div className="App">
      <PersonCard
        firstName={"Abood"}
        lastName={"Razeq"}
        age={25}
        hairColor={"black"}
      />
      <PersonCard
        firstName={"Rami"}
        lastName={"John"}
        age={33}
        hairColor={"red"}
      />
      <PersonCard
        firstName={"Ahmad"}
        lastName={"snene"}
        age={44}
        hairColor={"brown"}
      />
    </div> */
    <div className="App">
      {/* <Form /> */}
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
