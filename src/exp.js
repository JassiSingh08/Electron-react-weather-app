const express = require("express");
const cors = require("cors");
// const logger = require("./logger");
// const pageName = "appServer.js";
// const { FRONTEND_PORT } = require("./config.js");
const app = express();
const PORT = 5000;

app.use(express.json({ limit: "100mb" }));
app.use(cors());
app.use(express.static(__dirname));

module.exports = function (cb) {
  app.listen(PORT, async () => {
    // logger(pageName + ": Express Server Started on Port" + PORT);
    console.log(": Express Server Started on Port" + PORT);
    cb();
  });
};