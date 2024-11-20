const { Router } = require("express");
const {
  getUsers,
  createUser,
  clearUsers,
  loginUser,
  logoutUser,
  getProfile,
} = require("../controllers/userController");

const auth = require("../middleware/auth"); // Ensure `auth` is exported and functions correctly
const {
  validateUserCreation,
  validateLogin,
} = require("../middleware/validation"); // Ensure validators handle errors gracefully
const logRequestDetails = require("../middleware/logger"); // Confirm logger is middleware and logs appropriately
const rateLimit = require("../middleware/rateLimit"); // Confirm rate-limiting middleware behaves as expected

const router = Router();

// Global middleware: Logs details of all incoming requests
router.use(logRequestDetails);

/**
 * Route definitions
 */

// GET: Fetch all users (requires authentication)
router.get("/", auth, getUsers);

// POST: Create a new user (validates input)
router.post("/", validateUserCreation, createUser);

// DELETE: Clear all users (admin only, requires authentication)
router.delete("/", auth, clearUsers);

// POST: Login a user (validates input, rate-limited)
router.post("/login", validateLogin, rateLimit, loginUser);

// GET: Logout user (clears JWT cookie or session)
router.get("/logout", logoutUser);

// GET: Fetch user profile (requires authentication)
router.get("/profile", auth, getProfile);

module.exports = router;
