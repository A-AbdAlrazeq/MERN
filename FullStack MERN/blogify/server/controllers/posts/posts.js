const expressAsyncHandler = require("express-async-handler");
const asyncHandler = require("express-async-handler");
const Post = require("../../models/Post/Post");
const User = require("../../models/User/User");
const Category = require("../../models/Category/Category");
//@desc  Create a post
//@route POST /api/v1/posts
//@access Private

exports.createPost = asyncHandler(async (req, res) => {
  //! Find the user/check if user account is verified
  const userFound = await User.findById(req.userAuth._id);
  if (!userFound) {
    throw new Error("User Not found");
  }
  // if (!userFound?.isVerified) {
  //   throw new Error("Action denied, your account is not verified");
  // }
  //Get the payload
  const { title, content, categoryId } = req.body;
  //check if post exists
  const postFound = await Post.findOne({ title });
  if (postFound) {
    throw new Error("Post already exists");
  }
  //Create post
  const post = await Post.create({
    title,
    content,
    category: categoryId,
    author: req?.userAuth?._id,
    image: req?.file?.path,
  });
  //!Associate post to user
  await User.findByIdAndUpdate(
    req?.userAuth?._id,
    {
      $push: { posts: post._id },
    },
    {
      new: true,
    }
  );

  //* Push post into category
  await Category.findByIdAndUpdate(
    req?.userAuth?._id,
    {
      $push: { posts: post._id },
    },
    {
      new: true,
    }
  );
  //? send the response
  res.json({
    status: "success",
    message: "Post Successfully created",
    post,
  });
});

//@desc  get all post
//@route GET /api/v1/posts
//@access public
exports.getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({}).populate("comments");
  res.status(201).json({
    status: "success",
    message: "Posts successfully fetched",
    posts,
  });
});

//@desc  get single post
//@route GET /api/v1/posts/:id
//@access public
exports.getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.status(201).json({
    status: "success",
    message: "Post successfully fetched",
    post,
  });
});

//@desc  Delete post
//@route DELETE /api/v1/posts/:id
//@access Private

exports.deletePost = asyncHandler(async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.status(201).json({
    status: "success",
    message: "post successfully deleted",
  });
});

//@desc  update post
//@route PUT /api/v1/posts/:id
//@access Private

exports.updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(201).json({
    status: "success",
    message: "post successfully updated",
    post,
  });
});
