import PersonCard from "./components/PersonCard";
import "./App.css";
import Form from "./components/form";
import "bootstrap/dist/css/bootstrap.css";

function App() {
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
      <Form />
    </div>
  );
}

export default App;
