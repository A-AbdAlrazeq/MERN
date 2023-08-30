import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DeleteButton = (props) => {
  const { id, onDelete } = props;
  const navigate = useNavigate();
  const onClickHandler = (e) => {
    e.preventDefault();
    axios
      .delete("http://localhost:8000/api/athletes/" + id)
      .then((Response) => {
        navigate("/");
        onDelete(id); // Trigger the state update in the parent component
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return <button onClick={onClickHandler}>Delete</button>;
};
export default DeleteButton;
