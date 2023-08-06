import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

const UserForm = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const createUser = (e) => {
    e.preventDefault();

    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      confPassword: confPassword,
    };
    console.log(newUser);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfPassword("");
  };

  return (
    <>
      <form class="form-inline w-25 mx-auto p-3" onSubmit={createUser}>
        <div class="form-group">
          <label htmlFor="first_name">First Name:</label>
          <input
            id="first_name"
            type="text"
            class="form-control"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div class="form-group">
          <label htmlFor="last_name">Last Name:</label>
          <input
            id="last_name"
            type="text"
            class="form-control"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div class="form-group">
          <label htmlFor="email">email Address:</label>
          <input
            id="email"
            type="email"
            class="form-control"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div class="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            class="form-control"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div class="form-group">
          <label htmlFor="con_password">Confirm Password:</label>
          <input
            id="con_password"
            type="password"
            class="form-control"
            onChange={(e) => setConfPassword(e.target.value)}
          />
        </div>
      </form>
      <div>
        <h2>Form Data:</h2>
        <p>First Name: {firstName}</p>
        <p>Last Name: {lastName}</p>
        <p>Email: {email}</p>
        <p>Password: {password}</p>
        <p>Confirm Password: {confPassword}</p>
      </div>
    </>
  );
};

export default UserForm;
