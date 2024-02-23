const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  details: {
    type: String,
    required: true,
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },

  subCategory: {
    type: String,
  },

  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
  },

  price: {
    type: Number,
    required: true,
  },

  discount: {
    type: Number,
  },

  warranty: {
    type: String,
  },

  totalQuantity: {
    type: Number,
    required: true,
  },

  minimumOrderQty: {
    type: Number,
    required: true,
  },

  sku: {
    type: Number,
    required: true,
  },

  status: {
    type: Boolean,
  },

  newProduct: {
    type: Boolean,
  },

  flashSale: {
    type: Boolean,
  },

  productDetails: Array,
  photos: Array,
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
