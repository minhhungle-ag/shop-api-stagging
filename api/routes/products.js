const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// get all product
router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skipIndex = (page - 1) * limit;

  try {
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .skip(skipIndex)
      .limit(limit)
      .exec();

    const count = await Product.countDocuments();

    res.status(200).json({
      products,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get product by id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: "Product not found" });
  }
});

// add product
router.post("/", async (req, res) => {
  const {
    title,
    price,
    firstImageUrl,
    secondImageUrl,
    thirtImageUrl,
    fourthImageUrl,
    fivthImageUrl,
    description,
  } = req.body;

  try {
    const newProduct = new Product({
      title,
      price,
      firstImageUrl,
      secondImageUrl,
      thirtImageUrl,
      fourthImageUrl,
      fivthImageUrl,
      description,
      createdAt: new Date(),
    });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// update product
router.put("/products/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(404).json({ message: "Product not found" });
  }
});

// delete product
router.delete("/:id", async (req, res) => {
  try {
    const removedProduct = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json(removedProduct);
  } catch (error) {
    res.status(404).json({ message: "Product not found" });
  }
});

module.exports = router;
