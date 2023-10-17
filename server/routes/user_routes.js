const express = require("express");
const {
  userSignUp,
  userLogin,
  changeUserPassword,
  userForgetPassword,
  test,
} = require("../controllers/user_controller");

const checkUserAuth = require("../middlewares/auth_middleware");
const isAdmin = require("../middlewares/admin_middleware");

const router = express.Router();

// public routes
router.post("/signup", userSignUp);
router.post("/login", userLogin);
router.post("/forget-password", userForgetPassword);

// protected routes
router.post("/change-password", checkUserAuth, changeUserPassword);

router.get("/test", checkUserAuth, isAdmin, test);

router.get("/user-auth", checkUserAuth, (req, res) => {
  res.status(200).send({ ok: true });
});

router.get("/admin-auth", checkUserAuth, isAdmin, (req, res) => {
  res.send({ ok: true });
});

module.exports = router;
