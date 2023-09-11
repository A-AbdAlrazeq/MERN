const express = require("express");
const {
  createCategory,
  getCategories,
  deleteCategory,
  updateCategory,
} = require("../../controllers/Categories/category");
const isLogin = require("../../middleware/isLogin");
const categoryRouter = express.Router();

//create
categoryRouter.post("/", isLogin, createCategory);
//?all
categoryRouter.get("/", getCategories);
// ! delete
categoryRouter.delete("/:id", isLogin, deleteCategory);
// * Update
categoryRouter.put("/:id", isLogin, updateCategory);

module.exports = categoryRouter;
