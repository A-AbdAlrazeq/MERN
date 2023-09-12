const express = require("express");
const isLogin = require("../../middleware/isLogin");
const {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
} = require("../../controllers/posts/posts");
const postsRouter = express.Router();

//create
postsRouter.post("/", isLogin, createPost);
//getting all
postsRouter.get("/", getPosts);
//getting single post
postsRouter.get("/:id", getPost);
//update
postsRouter.put("/:id", isLogin, updatePost);
//delete
postsRouter.delete("/:id", isLogin, deletePost);

module.exports = postsRouter;
