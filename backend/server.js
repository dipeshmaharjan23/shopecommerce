const app = require("./app");
const connectDatabase = require("./config/database");
const dotenv = require("dotenv");

dotenv.config({ path: "backend/config/config.env" });

connectDatabase();

app.listen(process.env.PORT || 5000, () => {
  console.log(
    `server started on port ${process.env.PORT} in ${process.env.NODE_ENV_DEVELOPMENT} mode`
  );
});
