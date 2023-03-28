const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  firstImageUrl: {
    type: String,
    required: true,
  },
  secondImageUrl: {
    type: String,
  },
  thirtImageUrl: {
    type: String,
  },
  fourthImageUrl: {
    type: String,
  },
  fivthImageUrl: {
    type: String,
  },

  createdAt: {
    type: String,
  },
  updatedAt: {
    type: String,
  },
});

module.exports = mongoose.model("Product", productSchema);
