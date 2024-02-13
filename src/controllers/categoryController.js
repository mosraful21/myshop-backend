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

const createCategory = async (req, res) => {
  try {
    const newCategory = new Category({
      name: req.body.name,
    });
    if (req.file) {
      newCategory.photo = req.file.path;
    }

    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(deletedCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCategory,
  upload,
  getAllCategory,
  deleteCategory,
};
