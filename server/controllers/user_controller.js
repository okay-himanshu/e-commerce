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

          const createdUser = new UserModel({
            name: name,
            email: email,
            password: hashPassword,
          });

          const savedUser = await createdUser.save();

          // generating JWT token
          // in mongodb id is saved as _id
          const token = jwt.sign({ userId: savedUser._id }, JWT_SECRET_KEY, {
            expiresIn: "5d",
          });

          res.json({
            status: true,
            message: "user signup successfully",
            token: token,
          });
        } catch (error) {
          res.json({
            status: false,
            message: "something went wrong. failed to signup " + error.message,
          });
        }
      } else {
        res.json({
          status: false,
          message: "password and confirm password doesn't match",
        });
      }
    } else {
      return res.json({
        status: false,
        message: "email already existed please login",
      });
    }
  } else {
    res.json({
      status: false,
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
            status: true,
            message: "logged in successfully",
            token: token,
          });
        } else {
          res.json({
            status: false,
            message: "email and password doesn't match",
          });
        }
      } else {
        return res.json({
          status: false,
          message: "user not found",
        });
      }
    } else {
      return res.json({
        status: false,
        message: "all filed is required",
      });
    }
  } catch {
    res.json({
      status: false,
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
        status: "success",
        message: "Password changed successfully",
      });
    } else {
      res.json({
        status: "failed",
        message: "new password and confirm new password doesn't match",
      });
    }
  } else {
    res.json({
      status: "failed",
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
