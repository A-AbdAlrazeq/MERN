const express = require("express");
const jokesController = require("../controllers/jokes.controller");

module.exports = (app) => {
  //GET random joke
  app.get("/api/jokes/random", jokesController.getRandomJoke);

  // GET all jokes
  app.get("/api/jokes", jokesController.getJokes);

  // GET joke by ID
  app.get("/api/jokes/:id", jokesController.getJokeById);

  // CREATE a new joke
  app.post("/api/jokes", jokesController.createJoke);

  // UPDATE a joke
  app.put("/api/jokes/:id", jokesController.updateJoke);

  // DELETE a joke
  app.delete("/api/jokes/:id", jokesController.deleteJoke);
};
