import PersonCard from "./components/PersonCard";
import "./App.css";

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
