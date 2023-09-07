const express = require("express");
const { register } = require("../../controllers/Users/UserController");
const usersRouter = express.Router();
//!Register
usersRouter.post("/api/v1/users/register", register);

module.exports = usersRouter;
