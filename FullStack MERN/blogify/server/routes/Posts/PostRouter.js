const express = require("express");
const isLogin = require("../../middleware/isLogin");
const {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  likePost,
  disLikePost,
} = require("../../controllers/posts/posts");
const checkAccountVerification = require("../../middleware/isAccountVerified");
const postsRouter = express.Router();

//create
postsRouter.post("/", isLogin, checkAccountVerification, createPost);
//getting all
postsRouter.get("/", getPosts);
//getting single post
postsRouter.get("/:id", getPost);
//update
postsRouter.put("/:id", isLogin, updatePost);
//like post
postsRouter.put("/likes/:id", isLogin, likePost);
//dislike post
postsRouter.put("/dislikes/:id", isLogin, disLikePost);
//delete
postsRouter.delete("/:id", isLogin, deletePost);

module.exports = postsRouter;
