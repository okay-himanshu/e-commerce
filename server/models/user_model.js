const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
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
    question: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      min: 6,
      max: 12,
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("users", userSchema);
module.exports = UserModel;
