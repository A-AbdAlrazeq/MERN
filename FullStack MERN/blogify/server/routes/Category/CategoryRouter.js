const express = require("express");
const { createCategory } = require("../../controllers/Categories/category");
const isLogin = require("../../middleware/isLogin");
const categoryRouter = express.Router();

//create
categoryRouter.post("/", isLogin, createCategory);

module.exports = categoryRouter;
