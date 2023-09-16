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
  claps,
  schedule,
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
//clap a post
postsRouter.put("/claps/:id", isLogin, claps);
//schedule post
postsRouter.put("/schedule/:postId", isLogin, schedule);
//delete
postsRouter.delete("/:id", isLogin, deletePost);

module.exports = postsRouter;
