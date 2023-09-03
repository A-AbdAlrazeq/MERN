const http = require("http");
const express = require("express");

//!server
const app = express();
const server = http.createServer(app);
//?start the server

const Port = process.env.PORT || 8000;
server.listen(Port, console.log(`Server is Running on PORT ${Port}`));
