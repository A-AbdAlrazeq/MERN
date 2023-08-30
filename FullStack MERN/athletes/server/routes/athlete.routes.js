const AthleteController = require("../controllers/athlete.controller");

module.exports = function (app) {
  app.get("/api/athletes", AthleteController.list);
  app.post("/api/athletes", AthleteController.create);
  app.get("/api/athletes/:id", AthleteController.detail);
  app.put("/api/athletes/:id", AthleteController.update);
  app.delete("/api/athletes/:id", AthleteController.delete);
};
