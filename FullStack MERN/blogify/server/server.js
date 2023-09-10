const http = require("http");
const express = require("express");
const usersRouter = require("./routes/Users/usersRouter");
const connectDB = require("./config/database");
const {
  notFound,
  globalErrHandler,
} = require("./middleware/globalErrorHandler");

//!server
const app = express();
//connect to db
connectDB();
//middleware
app.use(express.json()); //pass incoming data
// routes
app.use("/api/v1/users", usersRouter);
//? not found middleware
app.use(notFound);
//! Error middleware
app.use(globalErrHandler);
const server = http.createServer(app);
//?start the server

const Port = process.env.PORT || 8000;
server.listen(Port, console.log(`Server is Running on PORT ${Port}`));
