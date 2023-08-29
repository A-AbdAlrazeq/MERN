const express = require("express");
const bodyParser = require("body-parser");
const authorRoutes = require("./routes/authorRoutes");
const cors = require("cors");
const app = express();
const PORT = 8000;

app.use(bodyParser.json());
require("./config/db");
app.use(cors());
app.use("/api", authorRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
