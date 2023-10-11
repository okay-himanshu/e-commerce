const UserModel = require("../models/user_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = require("../config/env_config").JWT_SECRET_KEY;

class UserController {
  static async userSignUp(req, res) {
    const { name, email, password, confirmPassword } = req.body;
    if (name && email && password && confirmPassword) {
      const checkExistedUser = await UserModel.findOne({ email });
      if (!checkExistedUser) {
        if (password === confirmPassword) {
          try {
            const salt = await bcrypt.genSalt(12);
            const hashPassword = await bcrypt.hash(password, salt);

            const createdUser = new UserModel({
              name: name,
              email: email,
              password: hashPassword,
            });

            await createdUser.save();
            const savedUser = await UserModel.findOne({ email });

            // generating JWT token

            // in mongodb id is saved as _id
            const token = jwt.sign({ userId: savedUser._id }, JWT_SECRET_KEY, {
              expiresIn: "5d",
            });

            res.json({
              status: "success",
              message: "user signup successfully",
              token: token,
            });
          } catch (error) {
            res.json({
              status: "failed",
              message:
                "something went wrong. failed to signup " + error.message,
            });
          }
        } else {
          res.json({
            status: "failed",
            message: "password and confirm password doesn't match",
          });
        }
      } else {
        return res.json({
          status: "failed",
          message: "email already existed please login",
        });
      }
    } else {
      res.json({
        status: "failed",
        message: "all input filed is required.",
      });
    }
  }

  static async userLogin(req, res) {
    const { email, password } = req.body;

    try {
      if (email && password) {
        const user = await UserModel.findOne({ email });

        if (user) {
          const isMatch = await bcrypt.compare(password, user.password);
          if (email === user.email && isMatch) {
            // creating JWT TOKEN
            const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, {
              expiresIn: "5d",
            });
            res.json({
              status: "success",
              message: "logged in successfully",
              token: token,
            });
          } else {
            res.json({
              status: "failed",
              message: "email and password doesn't match",
            });
          }
        } else {
          return res.json({
            status: "failed",
            message: "user not found",
          });
        }
      } else {
        return res.json({
          status: "failed",
          message: "all filed is required",
        });
      }
    } catch {
      res.json({
        status: "failed",
        message: "something went wrong",
      });
    }
  }
}

module.exports = UserController;
