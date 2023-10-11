const express = require("express");
const UserController = require("../controllers/user_controller");
const checkUserAuth = require("../middlewares/auth_middleware");

const router = express.Router();

// router level middle ware to protect specific routes
router.use("/change-password", checkUserAuth);

// public routes
router.post("/signup", UserController.userSignUp);
router.post("/login", UserController.userLogin);

// protected routes
router.post("/change-password", UserController.changeUserPassword);

module.exports = router;
