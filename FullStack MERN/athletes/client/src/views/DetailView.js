import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteButton from "../components/DeleteButton";
import { useParams } from "react-router-dom";
const DetailView = (props) => {
  const { id } = useParams();
  const [athletes, setAthletes] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/athletes/" + id)
      .then((response) => {
        setAthletes(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <h1>
        {athletes.firstName} {athletes.lastName}
      </h1>
      <p>Sport: {athletes.sport}</p>
      <p>Team: {athletes.team}</p>
      <DeleteButton id={athletes._id} />
    </div>
  );
};
export default DetailView;
