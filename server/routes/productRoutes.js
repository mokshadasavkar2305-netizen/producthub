// server/routes/productRoutes.js

const express = require("express");
const router = express.Router();

const Product = require("../models/Product");


// GET all products
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


// GET single product by ID (for Product Details page)
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

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


// ADD new product
router.post("/add", async (req, res) => {
  try {
    const { name, price, category, image } = req.body;

    const newProduct = new Product({
      name,
      price,
      category,
      image
    });

    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({
      message: "Failed to add product"
    });
  }
});

module.exports = router;