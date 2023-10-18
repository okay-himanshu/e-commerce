const express = require("express");
const checkUserAuth = require("../middlewares/auth_middleware");
const isAdmin = require("../middlewares/admin_middleware");
const {
  createCategory,
  updateCategory,
  getAllCategory,
  getSingleCategory,
  deleteCategory,
} = require("../controllers/category_controller");

const router = express.Router();

// ROUTES

// create category
router.post("/create-category", checkUserAuth, isAdmin, createCategory);

// update category
router.patch("/update-category/:id", checkUserAuth, isAdmin, updateCategory);

// get all category
router.get("/get-all-category", getAllCategory);

// get single category
router.get("/get-single-category/:slug", getSingleCategory);

// delete category
router.delete("/delete-category/:id", checkUserAuth, isAdmin, deleteCategory);

module.exports = router;
