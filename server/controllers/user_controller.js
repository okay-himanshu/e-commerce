const UserModel = require("../models/user_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = require("../config/env_config").JWT_SECRET_KEY;

async function userSignUp(req, res) {
  console.log(req.body);
  const { name, email, securityQuestion, password, confirmPassword } = req.body;
  if (name && email && securityQuestion && password && confirmPassword) {
    const checkExistedUser = await UserModel.findOne({ email });
    if (!checkExistedUser) {
      if (password === confirmPassword) {
        // hashing password
        try {
          const salt = await bcrypt.genSalt(12);
          const hashPassword = await bcrypt.hash(password, salt);

          const user = await new UserModel({
            name,
            email,
            securityQuestion,
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
            user: {
              name: user.name,
              email: user.email,
            },
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

async function userForgetPassword(req, res) {
  try {
    const { email, securityQuestion, newPassword, confirmNewPassword } =
      req.body;

    if (email && securityQuestion && newPassword && confirmNewPassword) {
      const user = await UserModel.findOne({ email: email });
      if (user) {
        if (securityQuestion === user.securityQuestion) {
          if (newPassword === confirmNewPassword) {
            // Hashing newPassword, not password
            const salt = await bcrypt.genSalt(12);
            const hashPassword = await bcrypt.hash(newPassword, salt);
            user.password = hashPassword;
            await user.save();

            return res.json({
              success: true,
              message:
                "password reset successfully , now login with your new password",
            });
          } else {
            res.json({
              success: false,
              message: "Passwords do not match, please try again.",
            });
          }
        } else {
          res.json({
            success: false,
            message: "Answer doesn't match the security question.",
          });
        }
      } else {
        res.json({
          success: false,
          message: "Email is not registered.",
        });
      }
    } else {
      res.json({
        success: false,
        message: "All fields are required.",
      });
    }
  } catch (err) {
    res.json({
      success: false,
      message: "Something went wrong",
      error: err,
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
  userForgetPassword,
  test,
};
