const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    items: {
      type: Array,
      required: true
    },

    totalAmount: {
      type: Number,
      required: true
    },

    paymentMethod: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Order",
  orderSchema
);