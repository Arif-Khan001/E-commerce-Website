const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    discountPrice: {
      type: Number,
      min: 0,
    },

    countInStock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    sku: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },

    category: {
      type: String,
      required: true,
      index: true,
    },

    brand: {
      type: String,
      index: true,
    },

    sizes: {
      type: [String],
      required: true,
    },

    colors: {
      type: [String],
      required: true,
    },

    collections: {
      type: [String],
      required: true,
      index: true,
    },

    material: {
      type: String,
      index: true,
    },

    gender: {
      type: String,
      enum: ["Men", "Women", "Unisex"],
      index: true,
    },

    images: [
      {
        url: {
          type: String,
          required: true,
        },
        altText: String,
      },
    ],

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },

    rating: {
      type: Number,
      default: 0,
    },

    numReviews: {
      type: Number,
      default: 0,
    },

    tags: {
      type: [String],
      index: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    metaTitle: String,
    metaDescription: String,
    metaKeywords: String,

    dimensions: {
      length: Number,
      width: Number,
      height: Number,
    },

    weight: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
