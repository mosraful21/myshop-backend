const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  title: String,
  url: String,
  photo: String,
});

const Banner = mongoose.model("Banner", bannerSchema);
module.exports = Banner;
