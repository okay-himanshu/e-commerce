const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 12,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    min: 6,
    max: 12,
  },
});

const UserModel = mongoose.model("users", userSchema);
module.exports = UserModel;
