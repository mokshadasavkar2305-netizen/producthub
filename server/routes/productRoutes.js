const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const upload = require("../middleware/upload");

// 📦 GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch products"
    });
  }
});

// 🔍 GET single product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
});

// ➕ ADD PRODUCT (WITH IMAGE UPLOAD)
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { name, price, category } = req.body;

    const newProduct = new Product({
      name,
      price,
      category,

      // 🖼️ store uploaded image path
      image: req.file
        ? `/uploads/${req.file.filename}`
        : ""
    });

    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({
      message: "Failed to add product"
    });
  }
});

// 🗑️ DELETE PRODUCT
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete product"
    });
  }
});

module.exports = router;