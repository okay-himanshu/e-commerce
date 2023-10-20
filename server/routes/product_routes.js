const express = require("express");
const formidableMiddleware = require("express-formidable");

const checkUserAuth = require("../middlewares/auth_middleware");
const isAdmin = require("../middlewares/admin_middleware");

const {
  createProductController,
  updateProductController,
  getProductsController,
  getSingleProductController,
  productImageController,
  deleteProductController,
  productFilterController,
  productCountController,
  productListController,
} = require("../controllers/product_controller");

const router = express.Router();

// ROUTING

// create product
router.post(
  "/create-product",
  checkUserAuth,
  isAdmin,
  formidableMiddleware(),
  createProductController
);

// update product
router.patch(
  "/update-product/:pid",
  checkUserAuth,
  isAdmin,
  formidableMiddleware(),
  updateProductController
);

// get all products
router.get("/get-products", getProductsController);

// get single product
router.get("/get-single-product/:slug", getSingleProductController);

// get product image
router.get("/product-image/:pid", productImageController);

// delete product
router.delete(
  "/delete-product/:pid",
  checkUserAuth,
  isAdmin,
  deleteProductController
);

// filter product
router.post("/filter-products", productFilterController);

// product count
router.get("/product-count", productCountController);

// product per page
router.get("/product-list/:page", productListController);

module.exports = router;
