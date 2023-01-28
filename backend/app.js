const express = require("express");
const app = express();

app.use(express.json());

const productRoute = require("./routes/products");

app.use("/", productRoute);

module.exports = app;
