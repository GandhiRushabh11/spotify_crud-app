const express = require("express");

const {
  handleUserRegistration,
  handleUserlogin,
  handleGetMe,
} = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/singup", handleUserRegistration);

router.post("/login", handleUserlogin);

router.get("/", protect, handleGetMe);
module.exports = router;
