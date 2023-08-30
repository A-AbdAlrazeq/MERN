const express = require("express");
const app = express();
const cors = require("cors");
require("./server/config/mongoose.config");
app.use(cors());
app.use(express.json());
require("./server/routes/athlete.routes")(app);
app.use(express.urlencoded({ extended: true }));
app.listen(8000, () => {
  console.log("Listening on port 8000");
});
