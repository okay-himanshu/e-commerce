const fs = require("fs");
const slugify = require("slugify");

const ProductModel = require("../models/product_model");

// create products
async function createProductController(req, res) {
  try {
    // getting all data from formidableMiddleware instead of req.body
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { image } = req.files; // getting the file

    // validation

    switch (true) {
      case !name:
        return res.status(400).send({
          success: false,
          message: "name is required",
        });
      case !description:
        return res.status(400).send({
          success: false,
          message: "description is required",
        });
      case !price:
        return res.status(400).send({
          success: false,
          message: "price is required",
        });
      case !category:
        return res.status(400).send({
          success: false,
          message: "category is required",
        });
      case !quantity:
        return res.status(400).send({
          success: false,
          message: "quantity is required",
        });
      case image && image.size > 1000000:
        return res.status(400).send({
          success: false,
          message: "image is required and should be less than 1mb",
        });
    }

    const products = new ProductModel({ ...req.fields, slug: slugify(name) });

    if (image) {
      products.image.data = fs.readFileSync(image.path);
      products.image.contentType = image.type;
    }

    await products.save();

    return res.status(201).send({
      success: true,
      message: "product created successfully",
      products,
    });
    //
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      success: false,
      message: "error while creating product",
      err,
    });
  }
}

// update product

async function updateProductController(req, res) {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { image } = req.files;

    switch (true) {
      case !name:
        return res.status(400).send({
          success: false,
          message: "name is required",
        });
      case !description:
        return res.status(400).send({
          success: false,
          message: "description is required",
        });
      case !price:
        return res.status(400).send({
          success: false,
          message: "price is required",
        });
      case !category:
        return res.status(400).send({
          success: false,
          message: "category is required",
        });
      case !quantity:
        return res.status(400).send({
          success: false,
          message: "quantity is required",
        });
      case image && image.size > 1000000:
        return res.status(400).send({
          success: false,
          message: "image is required and should be less than 1mb",
        });
    }

    const products = await ProductModel.findByIdAndUpdate(
      req.params.pid,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true }
    );

    if (image) {
      products.image.data = fs.readFileSync(image.path);
      products.image.contentType = image.type;
    }

    await products.save();

    return res.status(201).send({
      success: true,
      message: "product updated successfully",
      products,
    });
    //
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      success: false,
      message: "error while creating product",
      err,
    });
  }
}

// get al products

async function getProductsController(req, res) {
  try {
    const products = await ProductModel.find({})
      .populate("category")
      .select("-image") // this will avoid image from showing
      .limit(12) // limit the number of products
      .sort({ createdAt: -1 }); // sort the products in descending order by createdAt field

    return res.send({
      success: true,
      message: "got all products successfully",
      length: products.length,
      products,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      success: false,
      message: "error while getting products",
      err,
    });
  }
}

// get single product based on slug

async function getSingleProductController(req, res) {
  try {
    const { slug } = req.params;
    const product = await ProductModel.findOne({ slug })
      .select("-image")
      .populate("category");
    if (product) {
      return res.status(200).send({
        success: true,
        message: "got single product successfully",
        product,
      });
    } else {
      return res.status(200).send({
        success: false,
        message: "not found the product",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({
      success: false,
      message: "failed while getting single product",
      err,
    });
  }
}

async function productImageController(req, res) {
  try {
    const { pid } = req.params;
    const product = await ProductModel.findById(pid).select("image");
    if (product.image.data) {
      res.set("Content-Type", product.image.contentType);
      return res.status(200).send(product.image.data);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({
      success: false,
      message: "failed while getting product image",
      err,
    });
  }
}

async function deleteProductController(req, res) {
  try {
    await ProductModel.findByIdAndDelete(req.params.pid).select("-image");
    return res.status(200).send({
      success: true,
      message: "product deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      success: false,
      message: "failed while deleting product",
      err,
    });
  }
}

module.exports = {
  createProductController,
  updateProductController,
  getProductsController,
  getSingleProductController,
  productImageController,
  deleteProductController,
};