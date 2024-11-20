const User = require("../model/userModel");
const Account = require("../model/accountModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  generateAccountNumber,
  generatePin,
  generateToken,
} = require("../utils/helper");

/**
 * Get all users (Admin only)
 */
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude sensitive fields
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error(`[ERROR]: Failed to fetch users - ${error.message}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Create a new user and an associated account
 */
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already in use" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({ name, email, password: hashedPassword });

    // Create an associated account
    const account = await Account.create({
      user: user._id,
      accountNumber: generateAccountNumber(),
      pin: generatePin(),
    });

    // Generate token and set cookie
    const token = generateToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, secure: true });

    res.status(201).json({ success: true, user: { name: user.name, email: user.email }, account });
  } catch (error) {
    console.error(`[ERROR]: Failed to create user - ${error.message}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Clear all users (Admin only)
 */
const clearUsers = async (req, res) => {
  try {
    const result = await User.deleteMany();
    res.status(200).json({
      success: true,
      message: "All users cleared",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error(`[ERROR]: Failed to clear users - ${error.message}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Log in a user
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Compare the password
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Generate token and set cookie
    const token = generateToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, secure: true });

    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.error(`[ERROR]: Login failed - ${error.message}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Log out the user
 */
const logoutUser = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({ success: true, message: "User logged out" });
  } catch (error) {
    console.error(`[ERROR]: Logout failed - ${error.message}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Get the profile of the logged-in user
 */
const getProfile = (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    res.status(200).json({ success: true, data: req.user });
  } catch (error) {
    console.error(`[ERROR]: Failed to fetch profile - ${error.message}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  getUsers,
  createUser,
  clearUsers,
  loginUser,
  logoutUser,
  getProfile,
};
