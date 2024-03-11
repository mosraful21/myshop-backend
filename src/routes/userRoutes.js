const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

const register = router.post("/", userController.registerUser);
const login = router.post("/", userController.loginUser);

module.exports = {
  register,
  login,
};
