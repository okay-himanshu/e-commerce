require("dotenv").config();
require("./config/db_config");
const cors = require("cors");
const express = require("express");
const userRoutes = require("./routes/user_routes");
const Config = require("./config/env_config");

const app = express();
const PORT = Config.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());
app.use("/api/v1/auth", userRoutes);

app.listen(PORT, () =>
  console.info(`server is running http://localhost:${PORT}`)
);
