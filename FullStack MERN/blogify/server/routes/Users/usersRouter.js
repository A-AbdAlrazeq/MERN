const express = require("express");
const {
  register,
  login,
  getProfile,
  blockUser,
  unblockUser,
  profileViewers,
} = require("../../controllers/Users/UserController");
const isLogin = require("../../middleware/isLogin");
isLogin;
const usersRouter = express.Router();
//!Register
usersRouter.post("/register", register);
//!login
usersRouter.post("/login", login);
//!profile
usersRouter.get("/profile", isLogin, getProfile);
// block user
usersRouter.put("/block/:userIdToBlock", isLogin, blockUser);
// unblock user
usersRouter.put("/unblock/:userIdToUnBlock", isLogin, unblockUser);
// unblock user
usersRouter.get("/profile-viewer/:userProfileId", isLogin, profileViewers);
module.exports = usersRouter;
