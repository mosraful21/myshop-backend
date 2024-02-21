const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  title: String,
  type: String,
  photo: String,
});

const Banner = mongoose.model("Banner", bannerSchema);
module.exports = Banner;
