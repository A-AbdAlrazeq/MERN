import React, { useState } from "react";

const PersonCard = (props) => {
  const [age, setAge] = useState(props.age);
  return (
    <div>
      <h1>
        My name is {props.firstName},{props.lastName}
      </h1>
      <p>Age: {age}</p>
      <p>Hair Color: {props.hairColor}</p>
      <button onClick={() => setAge(age + 1)}>
        Birthday Button for {props.firstName} {props.lastName}
      </button>
    </div>
  );
};
export default PersonCard;
