const PersonController = require("../controllers/person.controller");
module.exports = (app) => {
  app.post("/api/people", PersonController.createPerson);
  app.get("/api/people", PersonController.getAllPeople);
  app.get("/api/people/:id", PersonController.getPerson);
};
