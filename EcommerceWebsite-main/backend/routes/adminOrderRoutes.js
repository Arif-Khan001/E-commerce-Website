const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const Order = require("../models/Order");

const router = express.Router();

// @route GET /api/admin/orders
// @description Get all order (Admin Only)
// @access Private

router.get("/", protect, admin, async(req, res) => {
    try {
        const orders = await Order.find({}).populate("user", "name email");
        res.json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({message : "Server Error"});
    }
})

// @route PUT /api/admin/orders/:id
// @description Update order status
// @access Private / Admin

router.put("/:id", protect, admin, async(req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("user", "name");
        if (order) {
            order.status = req.body.status || order.status;
            order.isDelivered = req.body.status === "Delivered" ? true : order.isDelivered;
            order.deliveredAt = req.body.status === "Delivered" ? Date.now() : order.deliveredAt;

            const updatedOrder = await order.save();

            res.json(updatedOrder);
        } else {
            res.status(404).json({message: "Order not found"});
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Server Error"});
    }
})


// @route DELETE /api/admin/orders/:id
// @description Delete an order
// @access Private / admin

router.delete("/:id", protect, admin, async(req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            await order.deleteOne();
            res.json({Message: "Order Removed"});
        } else {
            res.status(404).json({ message: "Order not found"});
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Server Error"});
    }
})


module.exports = router;