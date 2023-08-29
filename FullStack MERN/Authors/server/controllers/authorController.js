const { validationResult } = require("express-validator");
const Author = require("../models/Author");

exports.createAuthor = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;
    const author = new Author({ name });
    await author.save();

    res.status(201).json(author);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateAuthor = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { name } = req.body;
    const author = await Author.findByIdAndUpdate(id, { name }, { new: true });

    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    res.json(author);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
exports.getAuthorById = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }
    res.json(author);
  } catch (error) {
    console.error("Error fetching author details:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching author details" });
  }
};
exports.deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const author = await Author.findByIdAndDelete(id);

    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    res.json({ message: "Author deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
