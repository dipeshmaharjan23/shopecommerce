const express = require("express");
const app = express();

app.use(express.json());
const product = require("./routes/products");

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api/v1", product);

module.exports = app;
