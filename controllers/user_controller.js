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
              status: "failed to signup",
              message: "password and confirm password doesn't match",
            });
          }
        } else {
          return res.json({
            status: "failed to signup",
            message: "email already existed please login",
          });
        }
      } else {
        res.json({
          status: "failed to signup",
          message: "all input filed is required.",
        });
      }
    } catch (error) {
      res.json({
        status: "something went wrong. failed to signup",
        message: error.message,
      });
    }
  }
}

module.exports = UserController;
