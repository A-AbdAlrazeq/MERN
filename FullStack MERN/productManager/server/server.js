const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const apiRoutes = require("./routes/api");

app.use(express.json()); /* allows JSON Objects to be posted */
app.use(
  express.urlencoded({ extended: true })
); /* allows JSON Objects with strings and arrays*/
app.use(bodyParser.json());
require("./config/db");
app.use(cors());
app.use("/api", apiRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
