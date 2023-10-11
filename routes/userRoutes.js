const express = require("express");
const UserController = require("../controllers/user_controller");

const router = express.Router();

// public routes
router.post("/signup", UserController.userSignUp);
router.post("/login", UserController.userLogin);

// protected routes

module.exports = router;
