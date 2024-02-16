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
    type: String,
    required: true,
  },

  subCategory: {
    type: String,
  },

  brand: {
    type: String,
    required: true,
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
    required: true,
  },

  totalQuantity: {
    type: Number,
    required: true,
  },

  minimumOrderQty: {
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
