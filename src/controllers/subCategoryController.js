const SubCategory = require("../models/subCategoryModel");
const Category = require("../models/categoryModel");
const multer = require("multer");

// Set up multer storage for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const createSubCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.body.category);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    const newSubCategory = new SubCategory({
      name: req.body.name,
      category: category,
    });
    if (req.file) {
      newSubCategory.photo = req.file.path;
    }

    const savedSubCategory = await newSubCategory.save();
    res.status(201).json(savedSubCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllSubCategory = async (req, res) => {
  try {
    const subCategories = await SubCategory.find().populate("category");
    res.json(subCategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteSubCategory = async (req, res) => {
  try {
    const subCategoryId = req.params.id;
    const deletedSubCategory = await SubCategory.findByIdAndDelete(
      subCategoryId
    );
    if (!deletedSubCategory) {
      return res.status(404).json({ message: "Sub Category not found" });
    }
    res.json(deletedSubCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createSubCategory,
  upload,
  getAllSubCategory,
  deleteSubCategory,
};
