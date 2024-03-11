const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: String,
    photo: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Brand = mongoose.model("Brand", brandSchema);
module.exports = Brand;
