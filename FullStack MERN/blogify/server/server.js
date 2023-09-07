const http = require("http");
const express = require("express");
const usersRouter = require("./routes/Users/usersRouter");
const connectDB = require("./config/database");

//!server
const app = express();
//connect to db
connectDB();
//middleware
app.use(express.json()); //pass incoming data
// routes
app.use("/", usersRouter);
const server = http.createServer(app);
//?start the server

const Port = process.env.PORT || 8000;
server.listen(Port, console.log(`Server is Running on PORT ${Port}`));
