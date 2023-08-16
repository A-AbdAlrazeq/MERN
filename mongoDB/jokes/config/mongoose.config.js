// mongoose.config.js
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/jokesdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error("Error connecting to database:", err));
