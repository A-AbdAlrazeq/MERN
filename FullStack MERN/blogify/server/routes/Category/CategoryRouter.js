const express = require("express");
const {
  createCategory,
  getCategories,
  deleteCategory,
  updateCategory,
  seedDefaultCategories,
} = require("../../controllers/Categories/category");
const isLogin = require("../../middleware/isLogin");
const categoryRouter = express.Router();

//create
categoryRouter.post("/", isLogin, createCategory);
//?all
categoryRouter.get("/", getCategories);
// seed defaults
categoryRouter.post("/seed-defaults", isLogin, seedDefaultCategories);
// ! delete
categoryRouter.delete("/:id", isLogin, deleteCategory);
// * Update
categoryRouter.put("/:id", isLogin, updateCategory);

module.exports = categoryRouter;
