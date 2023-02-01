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
    resetPasswordExpires: { $gt: Date.now() },
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
