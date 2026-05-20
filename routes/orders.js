const router = require("express").Router();
const Order = require("../models/Order");
const auth = require("../middleware/auth");

// Place order
router.post("/", auth, async (req, res) => {
  try {
    const order = new Order({
      userId: req.user.id,
      items: req.body.items,
      total: req.body.total,
      address: req.body.address,
      status: "Pending"
    });

    await order.save();

    res.json({
      message: "Order placed successfully",
      order
    });
  } catch (error) {
    res.status(500).json({ message: "Error placing order" });
  }
});

module.exports = router;