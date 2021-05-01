const jwt = require("jsonwebtoken");

const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({ username, email, password });

    sendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new ErrorResponse("Please provide an email and password", 400));

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(new ErrorResponse("Invalid credentials", 401));

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return next(new ErrorResponse("Invalid credentials", 401));

    sendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
};

exports.refreshToken = async (req, res, next) => {
  const token = await jwt.sign(
    { id: req.body.userid },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
  res.status(200).json({ success: true, token });
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  res
    .status(statusCode)
    .json({ sucess: true, token, username: user.username, userid: user._id });
};
