const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(express.json({ limit: "100mb" }));
app.use(cors());
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.send("Hello, Express Server!");
});

app.get("/app/version", (req, res) => {
  const latestVersion = "1.2.0";
  res.json({ version: latestVersion });
});


module.exports = function (cb) {
  app.listen(PORT, () => {
    console.log("Express Server Started on Port " + PORT);
    cb();
  });
};
