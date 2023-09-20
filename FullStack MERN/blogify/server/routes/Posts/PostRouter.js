const express = require("express");
const multer = require("multer");
const isLogin = require("../../middleware/isLogin");
const storage = require("../../utils/fileUpload");
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

//! file upload middleware
const upload = multer({ storage });

//create
postsRouter.post("/", isLogin, upload.single("file"), createPost);
//getting all
postsRouter.get("/", isLogin, getPosts);
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
