const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
    })
    .then((con) => {
      console.log(`connected to mongodb with host: ${con.connection.host}`);
    })
    .catch((err) => {
      console.log(err);
    });
};
// const connectDatabase = () => {
//   mongoose.set("strictQuery", true);
//   mongoose
//     .connect(process.env.DB_LOCAL_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     .then((con) => {
//       console.log(`connected to mongodb with host: ${con.connection.host}`);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

module.exports = connectDatabase;
