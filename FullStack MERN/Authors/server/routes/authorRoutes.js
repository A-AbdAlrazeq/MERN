const express = require("express");
const { body } = require("express-validator");
const authorController = require("../controllers/authorController");

const router = express.Router();

router.post(
  "/authors",
  [
    body("name")
      .isLength({ min: 3 })
      .withMessage("Author name must be at least 3 characters"),
  ],
  authorController.createAuthor
);

router.get("/authors", authorController.getAllAuthors);

router.patch(
  "/authors/:id",
  [
    body("name")
      .isLength({ min: 3 })
      .withMessage("Author name must be at least 3 characters"),
  ],
  authorController.updateAuthor
);
router.get("/authors/:id", authorController.getAuthorById);
router.delete("/authors/:id", authorController.deleteAuthor);

module.exports = router;
