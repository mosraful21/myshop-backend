const Banner = require("../models/bannerModel");
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

const createBanner = async (req, res) => {
  try {
    const newBanner = new Banner({
      title: req.body.title,
      type: req.body.type,
    });
    if (req.file) {
      newBanner.photo = req.file.path;
    }

    const savedBanner = await newBanner.save();
    res.status(201).json(savedBanner);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllBanner = async (req, res) => {
  try {
    const banner = await Banner.find();
    res.json(banner);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteBanner = async (req, res) => {
  try {
    const bannerId = req.params.id;
    const deletedBanner = await Banner.findByIdAndDelete(bannerId);
    if (!deletedBanner) {
      return res.status(404).json({ message: "Banner not found" });
    }
    res.json(deletedBanner);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createBanner,
  upload,
  getAllBanner,
  deleteBanner,
};
