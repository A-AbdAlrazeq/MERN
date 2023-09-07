const express = require("express");
const {
  register,
  login,
  getProfile,
} = require("../../controllers/Users/UserController");
const isLogin = require("../../middleware/isLogin");
isLogin;
const usersRouter = express.Router();
//!Register
usersRouter.post("/register", register);
//!login
usersRouter.post("login", login);
//!profile
usersRouter.get("/profile/:id", isLogin, getProfile);

module.exports = usersRouter;
