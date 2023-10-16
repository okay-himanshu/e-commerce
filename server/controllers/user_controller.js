const UserModel = require("../models/user_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = require("../config/env_config").JWT_SECRET_KEY;

async function userSignUp(req, res) {
  const { name, email, password, confirmPassword } = req.body;
  if (name && email && password && confirmPassword) {
    const checkExistedUser = await UserModel.findOne({ email });
    if (!checkExistedUser) {
      if (password === confirmPassword) {
        // hashing password
        try {
          const salt = await bcrypt.genSalt(12);
          const hashPassword = await bcrypt.hash(password, salt);

          const user = new UserModel({
            name,
            email,
            password: hashPassword,
          }).save();

          // generating JWT token
          // in mongodb id is saved as _id
          const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, {
            expiresIn: "5d",
          });
          res.json({
            success: true,
            message: "user signup successfully",
            token,
            user,
          });
        } catch (error) {
          res.json({
            success: false,
            message: "something went wrong. failed to signup " + error.message,
          });
        }
      } else {
        res.json({
          success: false,
          message: "password and confirm password doesn't match",
        });
      }
    } else {
      return res.json({
        success: false,
        message: "email already existed please login",
      });
    }
  } else {
    res.json({
      success: false,
      message: "all input filed is required.",
    });
  }
}

async function userLogin(req, res) {
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
            success: true,
            message: "logged in successfully",
            token: token,
            user: {
              name: user.name,
              email: user.email,
            },
          });
        } else {
          res.json({
            success: false,
            message: "email and password doesn't match",
          });
        }
      } else {
        return res.json({
          success: false,
          message: "user not found",
        });
      }
    } else {
      return res.json({
        success: false,
        message: "all filed is required",
      });
    }
  } catch {
    res.json({
      success: false,
      message: "something went wrong",
    });
  }
}

async function changeUserPassword(req, res) {
  const { password, confirmPassword } = req.body;
  if (password && confirmPassword) {
    if (password === confirmPassword) {
      const salt = await bcrypt.genSalt(12);
      const hashPassword = await bcrypt.hash(password, salt);
      await UserModel.findByIdAndUpdate(req.user._id, {
        $set: {
          password: hashPassword,
        },
      });

      res.json({
        success: "success",
        message: "Password changed successfully",
      });
    } else {
      res.json({
        success: "failed",
        message: "new password and confirm new password doesn't match",
      });
    }
  } else {
    res.json({
      success: "failed",
      message: "All fields required",
    });
  }
}

async function test(req, res) {
  res.send({
    message: "welcome to protected route",
  });
}

module.exports = {
  userSignUp,
  userLogin,
  changeUserPassword,
  test,
};
