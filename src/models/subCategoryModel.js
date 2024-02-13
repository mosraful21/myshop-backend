const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema({
  name: String,
  category: String,
  photo: String,
});

const SubCategory = mongoose.model("SubCategory", subCategorySchema);
module.exports = SubCategory;
