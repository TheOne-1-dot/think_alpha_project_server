// routes/userRoutes.js
const express = require("express");
const User = require("../models/User");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.get("/allUsers", authenticate, async (req, res) => {
  try {
    const users = await User.find({}); // You might want to select specific fields
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch users: " + error.message });
  }
});

module.exports = router;
