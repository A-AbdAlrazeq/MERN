import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const PersonList = (props) => {
  /* We deconstruct getter and setter which were passed down 
    via props by the parent component (app.js) to our child 
    component (PersonList.js). Now we can easily use the getter 
    and setter without having to write props.getter or props.setter every time: */
  const { removeFromDom, people, setPeople } = props;
  const deletePerson = (personId) => {
    axios
      .delete("http://localhost:8000/api/people/" + personId)
      .then((res) => {
        removeFromDom(personId);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/people")
      .then((res) => {
        setPeople(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    //setPeople([...people, res.data]) when get data or i can add [people] here with post to get all data and update immediately
  }, []);

  return (
    <div>
      {people.map((person, index) => {
        return (
          <div key={index}>
            {" "}
            {/* Like our JSX return, map requires ONE parent element, so let's
            refactor. */}
            <p>
              {person.firstName} {person.lastName}
              <Link to={"/people/edit/" + person._id}>Edit</Link>
              <button
                onClick={(e) => {
                  deletePerson(person._id);
                }}
              >
                Delete
              </button>
            </p>
            {/* Look to Code Block 3. That :id gets its value right here. */
            /*
            Clicking this element will assign the "id" param the value of this
            document's _id field */
            /* This will take us to a path similar to
          "localhost:3000/people/627837837af9898989c9848" */}
            <Link to={`/people/${person._id}`}>
              {" "}
              {person.firstName}'s Page!{" "}
            </Link>
          </div>
        );
      })}
    </div>
  );
};
export default PersonList;
