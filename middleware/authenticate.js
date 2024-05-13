// middleware/authenticate.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Authentication token is missing or improperly formatted",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Optionally, validate the user exists in the database
    const user = await User.findById({
      _id: decoded.userId,
    });
    if (!user) {
      return res.status(401).json({ message: "Token is invalid" });
    }

    // Attach user to the request object
    req.user = user;

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authenticate;
