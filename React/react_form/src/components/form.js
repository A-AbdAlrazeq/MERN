import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

const UserForm = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confPasswordError, setConfPasswordError] = useState("");

  const validateFirstName = () => {
    if (firstName.trim() && firstName.length < 2) {
      setFirstNameError("First Name must be at least 2 characters");
    } else {
      setFirstNameError("");
    }
  };

  const validateLastName = () => {
    if (lastName.trim() && lastName.length < 2) {
      setLastNameError("Last Name must be at least 2 characters");
    } else {
      setLastNameError("");
    }
  };

  const validateEmail = () => {
    if (email.trim() && email.length < 5) {
      setEmailError("Email must be at least 5 characters");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = () => {
    if (password.trim() && password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
    } else {
      setPasswordError("");
    }
  };

  const validateConfPassword = () => {
    if (confPassword.trim() && password !== confPassword) {
      setConfPasswordError("Passwords do not match");
    } else {
      setConfPasswordError("");
    }
  };
  const createUser = (e) => {
    e.preventDefault();

    validateFirstName();
    validateLastName();
    validateEmail();
    validatePassword();
    validateConfPassword();
    if (
      firstName &&
      lastName &&
      email &&
      password &&
      confPassword &&
      password === confPassword
    ) {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfPassword("");
    }
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
            onBlur={validateFirstName}
          />
          {firstNameError && <p>{firstNameError}</p>}
        </div>
        <div class="form-group">
          <label htmlFor="last_name">Last Name:</label>
          <input
            id="last_name"
            type="text"
            class="form-control"
            onChange={(e) => setLastName(e.target.value)}
            onBlur={validateLastName}
          />
          {lastNameError && <p>{lastNameError}</p>}
        </div>
        <div class="form-group">
          <label htmlFor="email">email Address:</label>
          <input
            id="email"
            type="email"
            class="form-control"
            onChange={(e) => setEmail(e.target.value)}
            onBlur={validateEmail}
          />
          {emailError && <p>{emailError}</p>}
        </div>
        <div class="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            class="form-control"
            onChange={(e) => setPassword(e.target.value)}
            onBlur={validatePassword}
          />
          {passwordError && <p>{passwordError}</p>}
        </div>
        <div class="form-group">
          <label htmlFor="con_password">Confirm Password:</label>
          <input
            id="con_password"
            type="password"
            class="form-control"
            onChange={(e) => setConfPassword(e.target.value)}
            onBlur={validateConfPassword}
          />
          {confPasswordError && <p>{confPasswordError}</p>}
        </div>
        <input className="btn btn-success m-1" type="submit" value="Register" />
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
