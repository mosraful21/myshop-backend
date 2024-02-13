const Admin = require("../models/adminModel");
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

const createAdmin = async (req, res) => {
  try {
    const newAdmin = new Admin({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    if (req.file) {
      newAdmin.photo = req.file.path;
    }

    const savedAdmin = await newAdmin.save();
    res.status(201).json(savedAdmin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllAdmin = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAdminById = async (req, res) => {
  try {
    const adminId = req.params.id;
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.json(admin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const adminId = req.params.id;
    const updatedAdmin = await Admin.findByIdAndUpdate(adminId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.json(updatedAdmin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const adminId = req.params.id;
    const deletedAdmin = await Admin.findByIdAndDelete(adminId);
    if (!deletedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.json(deletedAdmin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createAdmin,
  upload,
  getAllAdmin,
  getAdminById,
  updateAdmin,
  deleteAdmin,
};
