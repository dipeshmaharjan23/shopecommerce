const app = require("./app");
const connectDatabase = require("./config/database");
const dotenv = require("dotenv");

// handle unchaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("shutting down the server due to uncaught exception");
  process.exit(1);
});

dotenv.config({ path: "backend/config/config.env" });

connectDatabase();

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(
    `server started on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});

// handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("shuting down server due to unhandled promise rejections");
  server.close(() => {
    process.exit(1);
  });
});
