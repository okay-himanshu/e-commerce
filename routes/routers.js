const express = require("express");
const UserController = require("../controllers/user_controller");

const Routes = express.Router();

Routes.route("/signup").post(UserController.SignUp);

module.exports = Routes;
