const fs = require("fs");
const slugify = require("slugify");

const ProductModel = require("../models/product_model");

// create products
async function createProductController(req, res) {
  try {
    // Getting all data from formidableMiddleware instead of req.body
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { image } = req.files; // Getting the file

    // Validation
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "Product name is required",
      });
    }
    if (!description) {
      return res.status(400).send({
        success: false,
        message: "Product description is required",
      });
    }
    if (!price) {
      return res.status(400).send({
        success: false,
        message: "Product price is required",
      });
    }
    if (!category) {
      return res.status(400).send({
        success: false,
        message: "Category is required",
      });
    }
    if (!quantity) {
      return res.status(400).send({
        success: false,
        message: "Product quantity is required",
      });
    }
    if (image && image.size > 1000000) {
      return res.status(400).send({
        success: false,
        message: "Image is required and should be less than 1MB",
      });
    }

    const product = new ProductModel({ ...req.fields, slug: slugify(name) });

    if (image) {
      product.image.data = fs.readFileSync(image.path);
      product.image.contentType = image.type;
    }

    await product.save();

    return res.status(201).send({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      success: false,
      message: "Error while creating the product",
      error: err.message,
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

async function productFilterController(req, res) {
  try {
    const { checked, selectedPrice } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (selectedPrice.length)
      args.price = { $gte: selectedPrice[0], $lte: selectedPrice[1] };
    const products = await ProductModel.find(args);
    res.status(200).send({
      success: true,
      message: "got products successfully",
      products,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      success: false,
      message: "failed while filtering product",
      err,
    });
  }
}

async function productCountController(req, res) {
  try {
    const total = await ProductModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      message: "got product count successfully",
      total,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      success: false,
      message: "failed while getting product count",
      err,
    });
  }
}

async function productListController(req, res) {
  try {
    const perPage = 10;
    const page = req.params.page ? req.params.page : 1;
    const products = await ProductModel.find({})
      .select("-image")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "got products successfully",
      products,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      success: false,
      message: "failed while getting product count",
      err,
    });
  }
}

async function relatedProductController(req, res) {
  try {
    const { pid, cid } = req.params;
    const products = await ProductModel.find({
      category: cid,
      _id: { $ne: pid },
    })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Got related products successfully",
      products,
    });
  } catch (err) {
    console.error(err);
    res.status(400).send({
      success: false,
      message: "Failed while getting related products",
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
  productFilterController,
  productCountController,
  productListController,
  relatedProductController,
};
