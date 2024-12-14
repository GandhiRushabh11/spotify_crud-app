const AppError = require("../utils/AppError");
const User = require("../models/userModel");
const { ZodError } = require("zod");
const { userValidationSchema } = require("../validations/userValidation");
const {
  loginValidationSchema,
} = require("../validations/loginValidationSchema");

exports.handleUserRegistration = async (req, res, next) => {
  try {
    // Validating incoming data
    const validatedData = userValidationSchema.parse(req.body);

    // Create the user using Mongoose
    const user = await User.create(validatedData);

    //Creating Token
    sendTokenResponse(
      user,
      201,
      res,
      "User registration completed successfully."
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return next(error);
    }
    next(error);
  }
};

exports.handleUserlogin = async (req, res, next) => {
  try {
    // Validating incoming data
    const { email, password } = loginValidationSchema.parse(req.body);

    // Check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      return next(new AppError("Invalid credentials", 401));
    }

    // Verify password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return next(new AppError("Invalid credentials", 401));
    }

    // Generate and send token
    sendTokenResponse(user, 200, res);
  } catch (error) {
    if (error instanceof ZodError) {
      return next(error);
    }
    next(error);
  }
};

exports.handleGetMe = async (req, res, next) => {
  const userId = req.user.id;

  // Fetching the user data
  const user = await User.findById(userId).select("-password"); //

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    data: user,
  });
};

// Get token from model, and send response
const sendTokenResponse = (user, statusCode, res, message) => {
  // Create token
  try {
    const token = user.getJwtToken();

    res.status(statusCode).json({
      success: true,
      token,
      message,
    });
  } catch (error) {
    return next(new AppError("Please try again.", 500));
  }
};
