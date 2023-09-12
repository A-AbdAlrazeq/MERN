const express = require("express");
const {
  createComment,
  deleteComment,
  updateComment,
} = require("../../controllers/comments/comments");

const isLogin = require("../../middleware/isLogin");
const commentRouter = express.Router();

//create
commentRouter.post("/:postId", isLogin, createComment);
//update
commentRouter.put("/:id", isLogin, updateComment);
//delete
commentRouter.delete("/:id", isLogin, deleteComment);

module.exports = commentRouter;
