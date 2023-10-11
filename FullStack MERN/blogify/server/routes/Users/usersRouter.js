const express = require("express");
const multer = require("multer");
const {
  register,
  login,
  getProfile,
  blockUser,
  unblockUser,
  profileViewers,
  followingUser,
  unFollowingUser,
  forgotPassword,
  resetPassword,
  accountVerificationEmail,
  verifyAccount,
  getPublicProfile,
  uploadProfilePicture,
  uploadCoverImage,
} = require("../../controllers/Users/UserController");
const isLogin = require("../../middleware/isLogin");
const storage = require("../../utils/fileUpload");
const usersRouter = express.Router();
//! file upload middleware
const upload = multer({ storage });

//!Register
usersRouter.post("/register", register);
//!login
usersRouter.post("/login", login);
// upload profile image
usersRouter.put(
  "/upload-profile-image",
  isLogin,
  upload.single("file"),
  uploadProfilePicture
);
// upload cover image
usersRouter.put(
  "/upload-cover-image",
  isLogin,
  upload.single("file"),
  uploadCoverImage
);
//!profile
usersRouter.get("/profile", isLogin, getProfile);
// public profile
usersRouter.get("/public-profile/:userId", getPublicProfile);
// block user
usersRouter.put("/block/:userIdToBlock", isLogin, blockUser);
// unblock user
usersRouter.put("/unblock/:userIdToUnBlock", isLogin, unblockUser);
// unblock user
usersRouter.get("/profile-viewer/:userProfileId", isLogin, profileViewers);
// forgot password user
usersRouter.post("/forgot-password", forgotPassword);
// reset password user
usersRouter.post("/reset-password/:resetToken", resetPassword);
// following user
usersRouter.put("/following/:userToFollowId", isLogin, followingUser);
// unFollowing user
usersRouter.put("/unFollowing/:userToUnFollowId", isLogin, unFollowingUser);
// send account verification email
usersRouter.put(
  "/account-verification-email",
  isLogin,
  accountVerificationEmail
);
// send account verification email
usersRouter.put("/account-verification/:verifyToken", isLogin, verifyAccount);
module.exports = usersRouter;
