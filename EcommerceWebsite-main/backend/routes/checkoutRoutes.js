const express = require("express");
const Checkout = require("../models/Checkout");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// POST /api/checkout 
// @desc Create a new checkout session
// @access Public
router.post("/", protect, async (req, res) => {
  const { checkoutItems, shippingAddress, paymentMethod } = req.body;

  if (!checkoutItems || checkoutItems.length === 0) {
    return res.status(400).json({ message: "No items in checkout" });
  }

  try {
    let totalPrice = 0;

    for (const item of checkoutItems) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res
          .status(404)
          .json({ message: `Product not found: ${item.productId}` });
      }

      if (item.quantity > product.countInStock) {
        return res.status(400).json({
          message: `Insufficient stock for ${product.name}`,
        });
      }

      totalPrice += product.price * item.quantity;
    }

    const checkout = await Checkout.create({
      user: req.user._id,
      checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: "pending",
      isPaid: false,
      isFinalized: false,
    });

    res.status(201).json(checkout);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// route PUT /api/checkout/:id/pay
// @description Update Product to mark as paid after successful payment
// @access Private
router.put("/:id/pay", protect, async (req, res) => {
  const { paymentStatus, paymentDetails = {} } = req.body;

  try {
    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }

    if (checkout.isPaid) {
      return res.status(400).json({ message: "Checkout already paid" });
    }

    if (paymentStatus !== "paid") {
      return res.status(400).json({
        message: "Invalid payment status. Expected 'paid'",
      });
    }

    checkout.isPaid = true;
    checkout.paymentStatus = "paid";
    checkout.paymentDetails = paymentDetails;
    checkout.paidAt = new Date();

    await checkout.save();

    res.status(200).json(checkout);
  } catch (err) {
    console.error("PAYMENT ERROR:", err);

    res.status(500).json({
      message: "Payment update failed",
      error: err.message,
    });
  }
});

// POST /api/checkout/:id/finalize
// @description Finalize checkout and convert to an order after payment confirmation
// @access Private
router.post("/:id/finalize", protect, async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }

    if (!checkout.isPaid) {
      return res.status(400).json({ message: "Checkout not paid" });
    }

    if (checkout.isFinalized) {
      return res.status(400).json({ message: "Checkout already finalized" });
    }

    // Create Order
    const order = await Order.create({
      user: checkout.user,
      orderItems: checkout.checkoutItems,
      shippingAddress: checkout.shippingAddress,
      paymentMethod: checkout.paymentMethod,
      totalPrice: checkout.totalPrice,
      isPaid: true,
      paidAt: checkout.paidAt,
      paymentStatus: "paid",
      status: "Processing",
    });

    for (const item of checkout.checkoutItems) {
      const product = await Product.findById(item.productId);
      if (product) {
        product.countInStock -= item.quantity;
        await product.save();
      }
    }

    checkout.isFinalized = true;
    checkout.finalizedAt = Date.now();
    await checkout.save();

    await Cart.findOneAndDelete({ user: checkout.user });

    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
