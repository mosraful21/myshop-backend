const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  details: String,
  category: String,
  subCategory: String,
  brand: String,
  price: String,
  discount: String,
  warranty: String,
  totalQuantity: Number,
  minimumOrderQty: Number,
  status: Boolean,
  productDetails: Array,
  photos: Array,
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
