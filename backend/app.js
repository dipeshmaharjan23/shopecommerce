const express = require("express");
const app = express();

app.use(express.json());

const product = require("./routes/products");

app.use("/api/v1", product);
app.get("/", (req, res) => {
  res.send("hello world");
});

module.exports = app;
