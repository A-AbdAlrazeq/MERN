// models/jokes.model.js
const mongoose = require("mongoose");

const jokeSchema = new mongoose.Schema(
  {
    setup: { type: String, required: true },
    punchline: { type: String, required: true },
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt
);

const Joke = mongoose.model("Joke", jokeSchema);

module.exports = Joke;
