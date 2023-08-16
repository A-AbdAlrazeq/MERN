// controllers/jokes.controller.js
const Joke = require("../models/jokes.model");

exports.getJokes = async (req, res) => {
  try {
    const jokes = await Joke.find();
    res.json(jokes);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getJokeById = async (req, res) => {
  const jokeId = req.params.id;

  try {
    const joke = await Joke.findById(jokeId);
    console.log(joke);
    if (!joke) {
      return res.status(404).json({ error: "Joke not found" });
    }
    res.json(joke);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(404).json({ error: "Joke not found" });
    }
    res.status(500).json({ error: "Server error" });
  }
};

exports.createJoke = async (req, res) => {
  const { setup, punchline } = req.body;

  try {
    if (!setup || !punchline) {
      return res
        .status(400)
        .json({ error: "Setup and punchline are required" });
    }

    const newJoke = await Joke.create({ setup, punchline });
    res.status(201).json(newJoke);
  } catch (err) {
    res.status(400).json({ error: "Invalid input" });
  }
};

exports.updateJoke = async (req, res) => {
  const jokeId = req.params.id;
  const { setup, punchline } = req.body;

  try {
    const updatedJoke = await Joke.findByIdAndUpdate(
      jokeId,
      { setup, punchline },
      { new: true }
    );
    if (!updatedJoke) {
      return res.status(404).json({ error: "Joke not found" });
    }
    res.json(updatedJoke);
  } catch (err) {
    res.status(400).json({ error: "Invalid input" });
  }
};

exports.deleteJoke = async (req, res) => {
  const jokeId = req.params.id;

  try {
    const deletedJoke = await Joke.findByIdAndDelete(jokeId);
    if (!deletedJoke) {
      return res.status(404).json({ error: "Joke not found" });
    }
    res.json({ message: "Joke deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
exports.getRandomJoke = async (req, res) => {
  try {
    const jokeCount = await Joke.countDocuments();
    console.log("Joke count:", jokeCount);
    if (jokeCount === 0) {
      return res.status(404).json({ error: "No jokes found" });
    }

    const randomIndex = Math.floor(Math.random() * jokeCount);
    const randomJoke = await Joke.findOne().skip(randomIndex);

    res.json(randomJoke);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
