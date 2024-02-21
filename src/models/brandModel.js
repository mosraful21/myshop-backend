const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
  name: String,
  photo: String,
});

const Brand = mongoose.model("Brand", brandSchema);
module.exports = Brand;
