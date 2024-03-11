const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: String,
    photo: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
