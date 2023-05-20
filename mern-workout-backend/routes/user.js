const express = require("express");
const router = express.Router();

// controller
const { signup, login } = require("../controllers/userController");

router
  .route("/login")
  .post(login);

router
  .route("/signup")
  .post(signup);

module.exports = router;