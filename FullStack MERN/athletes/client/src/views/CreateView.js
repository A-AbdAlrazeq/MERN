import React, { useState } from "react";
import Form from "../components/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateView = (props) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const onSubmitHandler = (e, data) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/athletes", data)
      .then((response) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        const errorResponse = err.response.data.errors;
        const arrError = Object.values(errorResponse).map(
          (errorObj) => errorObj.message
        );
        setErrors(arrError);
      });
  };
  return (
    <div>
      <h1>Create a new athlete</h1>
      {errors.map((error, index) => {
        return <p key={index}>{error}</p>;
      })}
      <Form
        onSubmitHandler={onSubmitHandler}
        initialFirstName=""
        initialLastName=""
        initialSport=""
        initialTeam=""
      />
    </div>
  );
};
export default CreateView;
