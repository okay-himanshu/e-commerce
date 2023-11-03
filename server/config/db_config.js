const mongoose = require("mongoose");
const Config = require("./env_config");

(module.exports = async function dbConnect() {
  try {
    const success = await mongoose.connect(process.env.MONGO_URL);
    if (success) {
      console.log("database connected");
    }
  } catch (err) {
    console.log("error while connecting to database", err);
  }
})();
