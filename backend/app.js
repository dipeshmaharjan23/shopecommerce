const express = require("express");
const morgan = require("morgan");
const app = express();
const cookieParser = require("cookie-parser");

const errorMiddleware = require("./middleware/error");

app.use(express.json());
app.use(cookieParser());

// import routes of all products
const productRoute = require("../backend/routes/products");
const auth = require("./routes/auth");
const order = require("./routes/order");

app.use("/api", productRoute);
app.use("/api", auth);
app.use("/api", order);

// Middleware to handle errors
app.use(errorMiddleware);

app.use(morgan("combined"));

module.exports = app;
