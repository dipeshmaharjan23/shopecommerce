const express = require("express");
const morgan = require("morgan");
const app = express();

const errorMiddleware = require("./middleware/error");

app.use(express.json());

// import routes of all products
const productRoute = require("./routes/products");

app.use("/api", productRoute);

// Middleware to handle errors
app.use(errorMiddleware);

app.use(morgan("combined"));

module.exports = app;
