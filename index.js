require("dotenv").config();
require("./config/db_config");
const express = require("express");
const Routes = require("./routes/routers");
const Config = require("./config/env_config");

const app = express();
const PORT = Config.PORT || 5000;

app.use("/api/", Routes);

app.listen(PORT, () =>
  console.info(`server is running http://localhost:${PORT}`)
);
