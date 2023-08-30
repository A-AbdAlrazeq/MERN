const mongoose = require("mongoose");

const AthleteSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: [true, "First Name is required"] },
    lastName: { type: String, required: [true, "Last Name is required"] },
    sport: { type: String },
    team: { type: String },
  },
  { timestamps: true }
);
module.exports.Athlete = mongoose.model("Athlete", AthleteSchema);
