const express = require("express");
const router = express.Router();

const Order = require("../models/Order");


// ADD ORDER
router.post("/add", async (req, res) => {
  try {
    const { items, totalAmount, paymentMethod } =
      req.body;

    const newOrder = new Order({
      items,
      totalAmount,
      paymentMethod
    });

    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({
      message: "Failed to place order"
    });
  }
});


// GET ALL ORDERS
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({
      createdAt: -1
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch orders"
    });
  }
});

module.exports = router;