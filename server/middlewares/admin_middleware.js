const UserModel = require("../models/user_model");
const isAdmin = async (req, res, next) => {
  try {
    const id = req.user;
    const user = await UserModel.findOne({ _id: id });

    if (user.role !== 1) {
      res.json({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (err) {
    res.json({
      success: false,
      message: "Error in admin middleware",
      err: err.message,
    });
  }
};
module.exports = isAdmin;
