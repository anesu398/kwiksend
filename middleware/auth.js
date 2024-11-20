const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

/**
 * Authentication middleware to verify JWT and set user in request object
 */
const auth = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt;

    // Check if token exists
    if (!token) {
      return res.status(401).json({ success: false, message: "Not authorized. Token missing." });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user associated with the token
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    console.error(`[ERROR]: Authentication failed - ${error.message}`);

    // Handle specific JWT errors
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token expired. Please log in again." });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ success: false, message: "Invalid token. Please log in again." });
    }

    // General error handling
    res.status(500).json({ success: false, message: "Internal server error during authentication." });
  }
};

module.exports = {
  auth,
};
