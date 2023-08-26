import React, { useState } from "react";
import PersonForm from "../components/PersonForm";
import PersonList from "../components/PersonList";
const Main = (props) => {
  const [people, setPeople] = useState([]);
  const removeFromDom = (personId) => {
    setPeople(people.filter((person) => person._id !== personId)); //We could also write this in our PersonList component
  };
  return (
    <div>
      {/* PersonForm and Person List can both utilize the getter and setter
      established in their parent component: */}
      <PersonForm people={people} setPeople={setPeople} />
      <hr />
      <PersonList
        people={people}
        setPeople={setPeople}
        removeFromDom={removeFromDom}
      />
    </div>
  );
};
export default Main;
