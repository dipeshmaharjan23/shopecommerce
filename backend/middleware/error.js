const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack,
    });
  }
  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err };
    error.message = err.message;

    // handling wrong mongoose id error
    if (err.name === "CastError") {
      const message = `Resource not found. Invalid: ${err.path}`;
      error = new ErrorHandler(message, 400);
    }

    // handling mongoose validation errors
    if (err.name === "validationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      error = new ErrorHandler(message, 400);
    }

    // Handling dublicate key errors
    if (err.code === 11000) {
      const message = `Dublicate ${Object.keys(err.errors)} entered`;
      error = new ErrorHandler(message, 400);
    }

    // handling wrong JWT errors
    if (err.code === "JsonWebTokenError") {
      const message = "Invalid JWT";
      error = new ErrorHandler(message, 400);
    }
    // handling expired JWT errors
    if (err.code === "TokenExpiredError") {
      const message = "token expired";
      error = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
  // err.message = err.message || "Internal Server Error";

  // res.status(err.statusCode).json({
  //   success: false,
  //   error: err.stack,
  // });
};
