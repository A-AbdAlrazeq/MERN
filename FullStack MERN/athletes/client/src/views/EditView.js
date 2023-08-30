import React, { useState, useEffect } from "react";
import Form from "../components/Form";
import DeleteButton from "../components/DeleteButton";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const EditView = (props) => {
  const { id } = useParams();
  const [errors, setErrors] = useState([]);
  const [athlete, setAthlete] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/athletes/" + id)
      .then((response) => {
        setAthlete(response.data);
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const onSubmitHandler = (e, data) => {
    e.preventDefault();
    axios
      .put("http://localhost:8000/api/athletes/" + id, data)
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          const errorMessages = error.response.data.errors;
          setErrors(errorMessages);
        }
      });
  };
  return (
    <div>
      <h1>
        Editing {athlete.firstName} {athlete.lastName}
      </h1>
      {Object.keys(errors).map((fieldName) => (
        <p key={fieldName}>{errors[fieldName]}</p>
      ))}
      {loaded && (
        <Form
          onSubmitHandler={onSubmitHandler}
          initialFirstName={athlete.firstName}
          initialLastName={athlete.lastName}
          initialSport={athlete.sport}
          initialTeam={athlete.team}
        />
      )}
      <DeleteButton id={athlete._id} />
    </div>
  );
};
export default EditView;
