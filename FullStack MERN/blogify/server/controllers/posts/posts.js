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
  //!find all users who have blocked the logged-in user
  const loggedInUserId = req.userAuth?._id;
  //get current time
  const currentTime = new Date();
  //return all users that's has blocked the login user
  const usersBlockingLoggedInUser = await User.find({
    blockedUsers: loggedInUserId,
  });
  // Extract the IDs of users who have blocked the logged-in user
  const blockingUsersIds = usersBlockingLoggedInUser?.map((user) => user?._id);
  //filter all post from the user that has blocked the login user using not included(nin) & get post when date less or equal current date or equal null
  let query = {
    author: { $nin: blockingUsersIds },
    $or: [
      {
        scheduledPublish: { $lte: currentTime },
        scheduledPublish: null,
      },
    ],
  };
  let posts = await Post.find(query).populate({
    path: "author",
    model: "User",
    select: "email role username",
  });
  res.status(201).json({
    status: "success",
    message: "Posts successfully fetched",
    posts,
  });
});

//@desc  Get only 4 posts
//@route GET /api/v1/posts
//@access PUBLIC

exports.getPublicPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({})
    .sort({ createdAt: -1 })
    .limit(4)
    .populate("category");
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
  const post = await Post.findById(req.params.id)
    .populate("author")
    .populate("category");
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
  //! Find the post
  const postFound = await Post.findById(req.params.id);
  const isAuthor =
    req.userAuth?._id?.toString() === postFound?.author?._id?.toString();
  console.log(isAuthor);

  if (!isAuthor) {
    throw new Error("Action denied, you are not the creator of this post");
  }
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

//@desc   liking a Post
//@route  PUT /api/v1/posts/likes/:id
//@access Private

exports.likePost = expressAsyncHandler(async (req, res) => {
  //Get the id of the post
  const { id } = req.params;
  //get the login user
  const userId = req.userAuth._id;
  //Find the post
  const post = await Post.findById(id);
  if (!post) {
    throw new Error("Post not found");
  }
  //Push thr user into post likes

  await Post.findByIdAndUpdate(
    id,
    {
      $addToSet: { likes: userId },
    },
    { new: true }
  );
  // Remove the user from the dislikes array if present
  post.dislikes = post.dislikes.filter(
    (dislike) => dislike.toString() !== userId.toString()
  );
  //re-save the post
  await post.save();
  res.status(200).json({ message: "Post liked successfully.", post });
});

//@desc   dislike a Post
//@route  PUT /api/v1/posts/dislikes/:id
//@access Private

exports.disLikePost = expressAsyncHandler(async (req, res) => {
  //Get the id of the post
  const { id } = req.params;
  //get the login user
  const userId = req.userAuth._id;
  //Find the post
  const post = await Post.findById(id);
  if (!post) {
    throw new Error("Post not found");
  }
  //Push the user into post dislikes

  await Post.findByIdAndUpdate(
    id,
    {
      $addToSet: { dislikes: userId },
    },
    { new: true }
  );
  // Remove the user from the likes array if present
  post.likes = post.likes.filter(
    (like) => like.toString() !== userId.toString()
  );
  //re-save the post
  await post.save();
  res.status(200).json({ message: "Post disliked successfully.", post });
});

//@desc   clap a Post
//@route  PUT /api/v1/posts/claps/:id
//@access Private

exports.claps = expressAsyncHandler(async (req, res) => {
  //Get the id of the post
  const { id } = req.params;
  //Find the post
  const post = await Post.findById(id);
  if (!post) {
    throw new Error("Post not found");
  }
  //implement the claps
  const updatedPost = await Post.findByIdAndUpdate(
    id,
    {
      $inc: { claps: 1 },
    },
    {
      new: true,
    }
  );
  res.status(200).json({ message: "Post clapped successfully.", updatedPost });
});

//@desc   Schedule a post
//@route  PUT /api/v1/posts/schedule/:postId
//@access Private

exports.schedule = expressAsyncHandler(async (req, res) => {
  //get the payload
  const { scheduledPublish } = req.body;
  const { postId } = req.params;
  //check if postId and scheduledPublished found
  if (!postId || !scheduledPublish) {
    throw new Error("PostId and schedule date are required");
  }
  //Find the post
  const post = await Post.findById(postId);
  if (!post) {
    throw new Error("Post not found...");
  }
  //check if the user is the author of the post
  if (post.author.toString() !== req.userAuth._id.toString()) {
    throw new Error("You can schedule your own post ");
  }
  // Check if the scheduledPublish date is in the past
  const scheduleDate = new Date(scheduledPublish);
  const currentDate = new Date();
  if (scheduleDate < currentDate) {
    throw new Error("The scheduled publish date cannot be in the past.");
  }
  //update the post
  post.scheduledPublish = scheduledPublish;
  await post.save();
  res.json({
    status: "success",
    message: "Post scheduled successfully",
    post,
  });
});
