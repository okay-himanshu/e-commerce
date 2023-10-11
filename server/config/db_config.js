const mongoose = require("mongoose");
const Config = require("./env_config");

(module.exports = async function dbConnect() {
  try {
    const success = await mongoose.connect(Config.DATABASE_URL);
    if (success) {
      console.log("database connected");
    }
  } catch (err) {
    console.log("error while connecting to database", err);
  }
})();
