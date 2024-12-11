const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

const protect = async (req, res, next) => {
  let token;

  // Check for the token in the authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("Not authorized to access this route", 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user ID to request
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    return next(new AppError("Not authorized to access this route", 401));
  }
};

module.exports = { protect };
