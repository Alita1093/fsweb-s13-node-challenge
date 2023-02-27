const express = require("express");
const server = express();

server.use(express.json());

const actionsRouter = require("./actions/actions-router");
server.use("/api/actions", actionsRouter);
const projectRouter = require("./projects/projects-router");
server.use("/api/projects", projectRouter);
// Sunucunuzu yapılandırın
// Eylem routerınızı /api/actions/actions-router.js içinde oluşturun
// Proje roterlarınızı /api/projects/projects-router.js içinde oluşturun
// Bu dosyanın içinde `server.listen()` YAPMAYIN!

module.exports = server;
