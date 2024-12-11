const { ZodError } = require("zod");

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  if (err instanceof ZodError) {
    statusCode = 400;
    message = err.errors.map((error) => ({
      path: error.path.join("."),
      message: error.message,
    }));

    return res.status(statusCode).json({
      success: false,
      errors: message,
    });
  }

  // Handle application-specific errors
  if (err.isOperational) {
    return res.status(statusCode).json({
      success: false,
      message,
    });
  }

  console.error("ERROR :", err);

  res.status(500).json({
    success: false,
    message: "Something went wrong. Please try again later.",
  });
};

module.exports = errorHandler;
