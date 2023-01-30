const User = require("../models/user");

const ErrorHandler = require("../utils/errorHandler");

const catchAsyncError = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
// Register a user
// const registerUser = catchAsyncError(async function (req, res, next) {
exports.registerUser = async function (req, res, next) {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "photos/mEZ3PoFGs_k",
      url: "https://unsplash.com/photos/mEZ3PoFGs_k",
    },
  });

  // const token = user.getJwtToken();
  // res.status(201).json({
  //   success: true,
  //   user,
  //   token,
  // });
  sendToken(user, 200, res);
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  // check if email and password are entered by the user
  if (!email || !password) {
    return next(new ErrorHandler("Please enter a email and password", 400));
  }

  // finding user in the database
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    return next(new ErrorHandler("Password mismatch", 401));
  }

  // const token = user.getJwtToken();

  // res.status(200).json({
  //   success: true,
  //   token: token,
  // });

  sendToken(user, 200, res);
};

// module.exports = {
//   registerUser,
//   loginUser,
// };
