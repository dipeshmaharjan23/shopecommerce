const User = require("../models/user");

const ErrorHandler = require("../utils/errorHandler");

const catchAsyncError = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sentEmail");
const crypto = require("crypto");

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

  sendToken(user, 200, res);
};

// forgot password
exports.forgotPassword = async function (req, res, next) {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(
      new ErrorHandler("Invalid email, user not found with this email", 404)
    );
  }

  // get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // create reset url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/user/password/reset/${resetToken}`;

  const message = `Your password reset token is as follows: \n\n ${resetUrl} \n\n If you have not requested a reset token please ignore this`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password reset token",
      message,
    }),
      res.status(200).json({
        success: true,
        message: `An email has been sent to ${user.email} with a reset link`,
      });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
};

exports.resetPassword = async function (req, res, next) {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpires: { $gte: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler("Password token is not valid or has been expired", 400)
    );
  }
  if (req.body.password !== user.confirmPassword) {
    return next(new ErrorHandler("Passwor does not match", 400));
  }

  // setup password

  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  sendToken(user, 200, res);
};

// get currently logged in user details /user/profile
exports.getUserProfile = async function (req, res, next) {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
};

// update or change pasword of user
exports.updatePassword = async function (req, res, next) {
  const user = await User.findById(req.user.id).select("+password");

  // check previous password
  const isMatched = await user.comparePassword(req.user.oldPassword);
  if (!isMatched) {
    return next(new ErrorHandler("Old password is incorrect", 401));
  }
  user.password = req.user.password;
  await user.save();

  sendToken(user, 200, res);
};

// update user profile
exports.updateUserProfile = async function (req, res) {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findOneAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });

  res.status(200).json({
    success: true,
    user,
  });
};

// logout
exports.logout = async function (req, res) {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

// Admin Routes

// get all users
exports.allUsers = async function (req, res, next) {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
};

// get user details

exports.getUserDetails = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User not found with id :${req.params.id}`, 404)
    );
  }
  // remove user

  res.status(200).json({
    success: true,
    user,
  });
};

// Update user
exports.updateUser = async function (req, res) {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findOneAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });

  res.status(200).json({
    success: true,
    user,
  });
};

// delete user
exports.deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User not found with id :${req.params.id}`, 404)
    );
  }
  // remove user
  await user.remove();

  res.status(200).json({
    success: true,
  });
};
