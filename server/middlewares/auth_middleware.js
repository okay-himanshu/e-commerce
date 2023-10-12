const jwt = require("jsonwebtoken");
const UserModel = require("../models/user_model");
const { JWT_SECRET_KEY } = require("../config/env_config");

const checkUserAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith("Bearer")) {
      const token = authorization.split(" ")[1];
      const { userId } = jwt.verify(token, JWT_SECRET_KEY);
      // req.user = await UserModel.findById(userId).select("-password");
      req.user = userId;
      next();
    } else {
      res.json({
        status: false,
        message: " token not found",
      });
    }
  } catch {
    res.json({
      status: false,
      message: "Unauthorized token",
    });
  }
};

module.exports = checkUserAuth;
