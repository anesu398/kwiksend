const { Router } = require("express");
const { auth } = require("../middleware/auth");
const { adminAuth } = require("../middleware/adminAuth"); // Additional middleware for admin-specific routes
const {
  getAccounts,
  deleteAccounts,
  getAccount,
} = require("../controllers/accountController");

const router = Router();

// Define route-level middleware for clarity and security
router.use(auth);

// Route: Get details of the logged-in user's account
router.get("/", async (req, res, next) => {
  try {
    await getAccount(req, res);
  } catch (error) {
    next(error); // Passes errors to global error handler
  }
});

// Route: Get all accounts (Admin only)
router.get("/all", adminAuth, async (req, res, next) => {
  try {
    await getAccounts(req, res);
  } catch (error) {
    next(error);
  }
});

// Route: Delete all accounts (Admin only)
router.delete("/", adminAuth, async (req, res, next) => {
  try {
    await deleteAccounts(req, res);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
