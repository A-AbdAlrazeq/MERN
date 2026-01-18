const asyncHandler = require("express-async-handler");
const Category = require("../../models/Category/Category");

//@desc  Create a category
//@route POST /api/v1/categories
//@access Private

exports.createCategory = asyncHandler(async (req, res) => {
  const { name, author } = req.body;
  //! if exist
  const categoryFound = await Category.findOne({ name });
  if (categoryFound) {
    throw new Error("Category already exists");
  }
  const category = await Category.create({
    name: name,
    author: req.userAuth?._id,
  });
  res.status(201).json({
    status: "success",
    message: "Category successfully created",
    category,
  });
});

//@desc  GET  Categories
//@route GET /api/v1/categories
//@access Public
exports.getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({}).populate({
    path: "posts",
    model: "Post",
  });
  res.status(200).json({
    status: "success",
    message: "Categories successfully fetched",
    categories,
  });
});

//@desc  Delete Category
//@route DELETE /api/v1/categories/:id
//@access Private

exports.deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    throw Object.assign(new Error("Category not found"), { statusCode: 404 });
  }
  const isAuthor = category?.author?.toString() === req.userAuth?._id?.toString();
  const isAdmin = req.userAuth?.role === "admin";
  if (!isAuthor && !isAdmin) {
    throw Object.assign(new Error("Action denied"), { statusCode: 403 });
  }
  await Category.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
    message: "Categories successfully deleted",
  });
});

//@desc  update Category
//@route PUT /api/v1/categories/:id
//@access Private

exports.updateCategory = asyncHandler(async (req, res) => {
  const categoryFound = await Category.findById(req.params.id);
  if (!categoryFound) {
    throw Object.assign(new Error("Category not found"), { statusCode: 404 });
  }
  const isAuthor =
    categoryFound?.author?.toString() === req.userAuth?._id?.toString();
  const isAdmin = req.userAuth?.role === "admin";
  if (!isAuthor && !isAdmin) {
    throw Object.assign(new Error("Action denied"), { statusCode: 403 });
  }
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    status: "success",
    message: "Categories successfully updated",
    category,
  });
});

exports.seedDefaultCategories = asyncHandler(async (req, res) => {
  const defaults = [
    "Sports",
    "Social Media",
    "Technology",
    "Business",
    "Health",
    "Travel",
    "Food",
    "Education",
    "Entertainment",
    "Lifestyle",
  ];

  const operations = defaults.map((name) => ({
    updateOne: {
      filter: { name },
      update: {
        $setOnInsert: {
          name,
          author: req.userAuth?._id,
        },
      },
      upsert: true,
    },
  }));

  await Category.bulkWrite(operations);
  const categories = await Category.find({});
  res.status(200).json({
    status: "success",
    message: "Default categories seeded",
    categories,
  });
});
