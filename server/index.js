require("dotenv").config();
require("./config/db_config");
const express = require("express");
const cors = require("cors");
const Config = require("./config/env_config");
const authRoutes = require("./routes/user_routes");
const categoryRoutes = require("./routes/category_routes");
const productRoutes = require("./routes/product_routes");

const app = express();
const PORT = Config.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// listening to port
app.listen(PORT, () =>
  console.info(`server is running http://localhost:${PORT}`)
);
