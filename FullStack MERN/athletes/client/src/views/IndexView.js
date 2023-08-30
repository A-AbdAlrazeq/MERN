import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DeleteButton from "../components/DeleteButton";
import axios from "axios";

const IndexView = (props) => {
  const [athletes, setAthletes] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/athletes")
      .then((response) => {
        setAthletes(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleDelete = (deletedId) => {
    // Filter out the deleted athlete from the list
    setAthletes((prevAthletes) =>
      prevAthletes.filter((athlete) => athlete._id !== deletedId)
    );
  };
  return (
    <div>
      <h1>Athletes</h1>
      <Link to="/create">Add athlete </Link>
      <ul>
        {athletes.map((athlete, index) => {
          return (
            <li key={index}>
              <Link to={"/" + athlete._id}>
                {athlete.firstName} {athlete.lastName}
              </Link>
              | <Link to={"/" + athlete._id + "/edit"}>Edit</Link> |{" "}
              <DeleteButton id={athlete._id} onDelete={handleDelete} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default IndexView;
