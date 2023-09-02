import "./App.css";
import ClassComponent from "./components/ClassComponent";

function App() {
  return (
    <div className="App">
      <ClassComponent someText={"Hello World"} />
      <ClassComponent someText={"i'm reusing this component"} />
    </div>
  );
}

export default App;
