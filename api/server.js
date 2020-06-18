const express = require("express");
const server = express();
const helmet = require("helmet");
const cors = require("cors");

// --------- routers import---------////
const clientRouter = require("../Routes/client-router.js");
const instructorRouter = require("../Routes/instructor-router");
const authRouter = require("../auth/auth-router.js");
// --------- packages import---------////
server.use(express.json());
server.use(helmet());
server.use(cors());
// --------- routers use---------////
server.use("/api/clients", clientRouter);
server.use("/api/instructor", instructorRouter);
server.use("/api", authRouter);

server.get("/", (req, res) => {
  res.send("<h1>&emsp;&emsp;&emsp;&emsp;API IS UP 🤖<h1>");
});

module.exports = server;
