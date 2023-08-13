import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

const Form = () => {
  const [category, setCategory] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();
  /* Get the navigate function from the hook  Hooks should only be used within the body of functional components,
  and useNavigate should be used inside your Form component, not inside the handleSubmit function.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/${category}/${id}`);
  };
  return (
    <form onSubmit={handleSubmit}>
      Search For:{" "}
      <select required onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select a Category</option>
        <option value="people">People</option>
        <option value="planets">Planets</option>
      </select>
      ID:{" "}
      <input required type="number" onChange={(e) => setId(e.target.value)} />
      <button type="submit">Search</button>
    </form>
  );
};

export default Form;
