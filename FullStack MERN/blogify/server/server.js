const http = require("http");
const express = require("express");
const usersRouter = require("./routes/Users/usersRouter");
const connectDB = require("./config/database");
const dotenv = require("dotenv");
dotenv.config();
const {
  notFound,
  globalErrHandler,
} = require("./middleware/globalErrorHandler");
const categoryRouter = require("./routes/Category/CategoryRouter");

//!server
const app = express();
//connect to db
connectDB();
//middleware
app.use(express.json()); //pass incoming data
// routes
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/categories", categoryRouter);
//? not found middleware
app.use(notFound);
//! Error middleware
app.use(globalErrHandler);
const server = http.createServer(app);
//?start the server

const Port = process.env.PORT || 8000;
server.listen(Port, console.log(`Server is Running on PORT ${Port}`));
