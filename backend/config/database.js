const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("connected to mongodb");
  });
};

module.exports = connectDatabase;
