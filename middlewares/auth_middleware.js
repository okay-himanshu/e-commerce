const jwt = require("jsonwebtoken");
const UserModel = require("../models/user_model");
const { JWT_SECRET_KEY } = require("../config/env_config");

const checkUserAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization && authorization.startsWith("Bearer")) {
    const token = authorization.split(" ")[1];

    try {
      const { userId } = jwt.verify(token, JWT_SECRET_KEY);
      req.user = await UserModel.findById(userId).select("-password");
      next();
    } catch (err) {
      res.status(401).json({
        status: "failed",
        message: "Unauthorized user or invalid token",
      });
    }
  } else {
    res.status(401).json({
      status: "failed",
      message: "Unauthorized user, No Token",
    });
  }
};

module.exports = checkUserAuth;
