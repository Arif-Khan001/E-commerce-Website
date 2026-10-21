const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

/* ================== HELPERS ================== */
const getCart = async (userId, guestId) => {
  if (userId) return Cart.findOne({ user: userId });
  if (guestId) return Cart.findOne({ guestId });
  return null;
};

// @route POST /api/cart
// @description Add a product to the cart for a guest or logged in user
// @access Public
router.post("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;

  if (!productId || !quantity || quantity <= 0) {
    return res.status(400).json({ message: "Invalid cart data" });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (quantity > product.countInStock) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    let cart = await getCart(userId, guestId);

    if (!cart) {
      cart = await Cart.create({
        user: userId || undefined,
        guestId: userId ? undefined : guestId || `guest_${Date.now()}`,
        products: [],
        totalPrice: 0,
      });
    }

    const index = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );

    if (index > -1) {
      cart.products[index].quantity += quantity;
    } else {
      cart.products.push({
        productId,
        name: product.name,
        image: product.images?.[0]?.url || "",
        price: product.price,
        size,
        color,
        quantity,
      });
    }

    cart.totalPrice = cart.products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error("ADD TO CART ERROR:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route PUT /api/cart
// @description Update product quantity in the cart for a guest or logged in user
// access Public
router.put("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;

  if (!productId) {
    return res.status(400).json({ message: "Product ID required" });
  }

  try {
    const cart = await getCart(userId, guestId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const index = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );

    if (index === -1) {
      return res.status(404).json({ message: "Product not in cart" });
    }

    if (quantity > 0) {
      cart.products[index].quantity = quantity;
    } else {
      cart.products.splice(index, 1);
    }

    cart.totalPrice = cart.products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error("UPDATE CART ERROR:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route DELETE /api/cart
// @description Remove a product from the cart
// @access Public
router.delete("/", async (req, res) => {
  const { productId, size, color, guestId, userId } = req.body;

  try {
    const cart = await getCart(userId, guestId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.products = cart.products.filter(
      (p) =>
        !(
          p.productId.toString() === productId &&
          p.size === size &&
          p.color === color
        )
    );

    cart.totalPrice = cart.products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error("REMOVE CART ITEM ERROR:", err);
    res.status(500).json({ message: "Server Error" });
  }
});


// @route GET /api/cart
// @description logged-in user's or guest user's cart
// @access Public
router.get("/", async (req, res) => {
  const { guestId, userId } = req.query;

  try {
    const cart = await getCart(userId, guestId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.json(cart);
  } catch (err) {
    console.error("GET CART ERROR:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route POST /api/cart/merge
// @description Merge guest cart into user cart on login
// @access Private
router.post("/merge", protect, async (req, res) => {
  const { guestId } = req.body;

  try {
    const guestCart = await Cart.findOne({ guestId });
    const userCart = await Cart.findOne({ user: req.user._id });

    if (!guestCart || guestCart.products.length === 0) {
      return res.json(userCart || null);
    }

    if (!userCart) {
      guestCart.user = req.user._id;
      guestCart.guestId = undefined;

      guestCart.totalPrice = guestCart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      await guestCart.save();
      return res.json(guestCart);
    }

    guestCart.products.forEach((gItem) => {
      const index = userCart.products.findIndex(
        (uItem) =>
          uItem.productId.toString() === gItem.productId.toString() &&
          uItem.size === gItem.size &&
          uItem.color === gItem.color
      );

      if (index > -1) {
        userCart.products[index].quantity += gItem.quantity;
      } else {
        userCart.products.push(gItem);
      }
    });

    userCart.totalPrice = userCart.products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    await userCart.save();
    await Cart.deleteOne({ guestId });

    res.json(userCart);
  } catch (err) {
    console.error("MERGE CART ERROR:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
