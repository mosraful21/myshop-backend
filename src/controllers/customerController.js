const Customer = require("../models/customerModel");
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

const createCustomer = async (req, res) => {
  try {
    const newCustomer = new Customer({
      fname: req.body.fname,
      lname: req.body.lname,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
    });
    if (req.file) {
      newCustomer.photo = req.file.path;
    }

    const savedCustomer = await newCustomer.save();
    res.status(201).json(savedCustomer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCustomerById = async (req, res) => {
  try {
    const customerId = req.params.id;
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;
    const updatedCustomer = await Customer.findByIdAndUpdate(
      customerId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;
    const deletedCustomer = await Customer.findByIdAndDelete(customerId);
    if (!deletedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.json(deletedCustomer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCustomer,
  upload,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
