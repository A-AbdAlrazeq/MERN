const { Athlete } = require("../models/athlete.model");
module.exports.list = (request, response) => {
  Athlete.find({})
    .then((athlete) => {
      response.json(athlete);
    })
    .catch((err) => {
      response.status(400).json(err);
    });
};

module.exports.create = (request, response) => {
  const { firstName, lastName, sport, team } = request.body;
  Athlete.create({ firstName, lastName, sport, team })
    .then((athlete) => {
      response.json(athlete);
    })
    .catch((err) => {
      response.status(400).json(err);
    });
};

module.exports.detail = (request, response) => {
  const { id } = request.params;
  Athlete.findOne({ _id: id })
    .then((athlete) => {
      response.json(athlete);
    })
    .catch((err) => {
      response.status(400).json(err);
    });
};

module.exports.update = (request, response) => {
  const { id } = request.params;
  const { firstName, lastName, sport, team } = request.body;
  const errors = {};

  if (!firstName) {
    errors.firstName = "First name is required";
  }

  if (!lastName) {
    errors.lastName = "Last name is required";
  }
  if (Object.keys(errors).length > 0) {
    return response.status(400).json({ errors });
  }
  Athlete.findOneAndUpdate(
    { _id: id },
    { firstName, lastName, sport, team },
    { new: true, userFindAndModify: true }
  )
    .then((athlete) => {
      response.json(athlete);
    })
    .catch((err) => {
      response.status(400).json(err);
    });
};

module.exports.delete = (request, response) => {
  const { id } = request.params;
  Athlete.deleteOne({ _id: id })
    .then((deleteConfirmation) => {
      response.json(deleteConfirmation);
    })
    .catch((err) => {
      response.status(400).json(err);
    });
};
