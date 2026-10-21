const mongoose = require("mongoose");

const checkoutItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    size: String,
    color: String,
  },
  { _id: false }
);

const checkoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    checkoutItems: {
      type: [checkoutItemSchema],
      validate: [(v) => v.length > 0, "Checkout must have items"],
    },

    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },

    paymentMethod: {
      type: String,
      enum: ["PayPal", "Stripe", "COD"],
      required: true,
    },

    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    isPaid: {
      type: Boolean,
      default: false,
    },

    paidAt: Date,

    paymentStatus: {
      type: String,
      default: "pending",
      enum: ["pending", "paid", "failed"],
    },

    paymentDetails: {
      type: mongoose.Schema.Types.Mixed,
    },

    isFinalized: {
      type: Boolean,
      default: false,
    },

    finalizedAt: Date,
  },
  {
    timestamps: true,
    expireAfterSeconds: 60 * 60 * 24, // ⏱ auto-delete after 24h if unused
  }
);

module.exports = mongoose.model("Checkout", checkoutSchema);
