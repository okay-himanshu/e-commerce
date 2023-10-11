const UserModel = require("../models/user_model");

class UserController {
  static async SignUp(req, res) {
    try {
      const { name, email, password, confirmPassword } = req.body;
      if (name && email && password && confirmPassword) {
        const checkExistedUser = await UserModel.findOne({ email });
        if (!checkExistedUser) {
          if (password === confirmPassword) {
            const createdUser = new UserModel({
              name: name,
              email: email,
              password: password,
            });

            const savedUser = await createdUser.save();
            res.json({
              status: "success",
              message: "user signup successfully",
            });
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
    } catch (error) {
      res.json({
        status: "failed",
        message: "something went wrong. failed to signup " + error.message,
      });
    }
  }

  static async Login(req, res) {
    const { email, password } = req.body;

    try {
      if (email && password) {
        const user = await UserModel.findOne({ email });

        if (!user)
          return res.json({ status: "failed", message: "user not found" });

        if (email === user.email && password === user.password) {
          res.json({ status: "success", message: "logged in successfully" });
        } else {
          res.json({
            status: "failed",
            message: "email and password doesn't match",
          });
        }
      } else {
        return res.json({ status: "failed", message: "all filed is required" });
      }
    } catch {
      res.json({ status: "failed", message: "something went wrong" });
    }
  }
}

module.exports = UserController;
