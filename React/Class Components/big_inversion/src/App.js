import React, { Component } from "react";
import "./App.css";
import PersonCard from "./components/PersonCard";
class App extends Component {
  render() {
    return (
      <div className="App">
        <PersonCard
          firstName="Abood"
          lastName="Razeq"
          age={25}
          hairColor="Black"
        />
        <PersonCard
          firstName="Jane"
          lastName="Smith"
          age={32}
          hairColor="Black"
        />
        <PersonCard
          firstName="Leo"
          lastName="Messi"
          age={36}
          hairColor="Black"
        />
        <PersonCard
          firstName="Alice"
          lastName="Williams"
          age={28}
          hairColor="Red"
        />
      </div>
    );
  }
}

export default App;
