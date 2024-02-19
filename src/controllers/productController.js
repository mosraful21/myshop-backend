const Brand = require("../models/brandModel");
const Category = require("../models/categoryModel");
const Product = require("../models/productModel");
const multer = require("multer");
const SubCategory = require("../models/subCategoryModel");

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

// post: Create Product---------------
const createProduct = async (req, res) => {
  try {
    const category = await Category.findById(req.body.category);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    const subCategory = await SubCategory.findById(req.body.subCategory);
    if (!subCategory) {
      return res.status(404).json({ error: "Sub Category not found" });
    }

    const brand = await Brand.findById(req.body.brand);
    if (!brand) {
      return res.status(404).json({ error: "Brand not found" });
    }

    const productDetails = JSON.parse(req.body.productDetails);

    const newProduct = new Product({
      name: req.body.name,
      details: req.body.details,
      category: category,
      subCategory: subCategory,
      brand: brand,
      price: req.body.price,
      discount: req.body.discount,
      warranty: req.body.warranty,
      totalQuantity: req.body.totalQuantity,
      minimumOrderQty: req.body.minimumOrderQty,
      status: req.body.status,
      newProduct: req.body.newProduct,
      flashSale: req.body.flashSale,
      productDetails: productDetails,
    });

    if (req.files && req.files.length > 0) {
      newProduct.photos = req.files.map((file) => file.path);
    }

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get: Show All Product---------------
const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category")
      .populate("subCategory")
      .populate("brand");
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//delete: Deleted Product---------------
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(deletedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update: Updated Product---------------
const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createProduct,
  upload,
  getAllProduct,
  deleteProduct,
  getProductById,
  updateProduct,
};
