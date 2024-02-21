const Brand = require("../models/brandModel");
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

const createBrand = async (req, res) => {
  try {
    const newBrand = new Brand({
      name: req.body.name,
    });
    if (req.file) {
      newBrand.photo = req.file.path;
    }

    const savedBrand = await newBrand.save();
    res.status(201).json(savedBrand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllBrand = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.json(brands);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteBrand = async (req, res) => {
  try {
    const brandId = req.params.id;
    const deletedBrand = await Brand.findByIdAndDelete(brandId);
    if (!deletedBrand) {
      return res.status(404).json({ message: "Brand not found" });
    }
    res.json(deletedBrand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createBrand,
  upload,
  getAllBrand,
  deleteBrand,
};
