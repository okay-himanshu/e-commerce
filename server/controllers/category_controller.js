const CategoryModel = require("../models/category_model");
const slugify = require("slugify");

async function createCategory(req, res) {
  try {
    const { name } = req.body;
    if (name) {
      const checkExistedCategory = await CategoryModel.findOne({ name });
      if (!checkExistedCategory) {
        const category = await new CategoryModel({
          name,
          slug: slugify(name),
        }).save();
        res.status(201).send({
          success: true,
          message: "Category created successfully",
          category,
        });
      } else {
        return res.status(200).send({
          success: false,
          message: "Category already exists.",
        });
      }
    } else {
      return res.status(401).send({
        success: false,
        message: "name is required",
      });
    }
  } catch (err) {
    return res.status(500).send({
      err,
      success: false,
      message: `Error in category controller`,
    });
  }
}

async function updateCategory(req, res) {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await CategoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "error while updating category",
      error,
    });
  }
}

async function getAllCategory(req, res) {
  try {
    const allCategory = await CategoryModel.find({});
    res.status(200).send({
      success: true,
      message: "got all category successfully",
      allCategory,
    });
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: "error while getting all category",
      err,
    });
  }
}

async function getSingleCategory(req, res) {
  try {
    const { slug } = req.params;

    const singleCategory = await CategoryModel.findOne({ slug });
    if (singleCategory) {
      return res.status(200).send({
        success: true,
        message: "get single category successfully",
        singleCategory,
      });
    } else {
      return res.status(200).send({
        success: false,
        message: "not found the category",
      });
    }
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: "error while getting single category",
      err,
    });
  }
}

async function deleteCategory(req, res) {
  try {
    const { id } = req.params;
    const deleteCategory = await CategoryModel.findByIdAndDelete(
      { _id: id },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "category deleted successfully",
      deleteCategory,
    });
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: "error while deleting category",
      err,
    });
  }
}
module.exports = {
  createCategory,
  updateCategory,
  getAllCategory,
  getSingleCategory,
  deleteCategory,
};
