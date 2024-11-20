const { Router } = require("express");
const {
  makeTransfer,
  deleteTransfers,
  getTransfers,
} = require("../controllers/transferController");
const { auth } = require("../middleware/auth");
const { validateTransfer, validateTransferDeletion } = require("../middleware/validation");
const { logRequestDetails } = require("../middleware/logger");

const router = Router();

// Log the request details for monitoring and debugging
router.use(logRequestDetails);

// Get all transfers (for authenticated users only)
router.get("/", auth, getTransfers);

// Make a transfer (authenticated and validated)
router.post("/", auth, validateTransfer, makeTransfer);

// Delete transfers (admins only, with validation)
router.delete("/", auth, validateTransferDeletion, deleteTransfers);

module.exports = router;
