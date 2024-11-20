const Account = require("../model/accountModel");

/**
 * Get list of all accounts with optional pagination and filtering
 */
const getAccounts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Pagination query parameters
    const accounts = await Account.find()
      .populate("user")
      .skip((page - 1) * limit)
      .limit(Number(limit));
    
    const totalAccounts = await Account.countDocuments();

    res.status(200).json({
      success: true,
      data: accounts,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(totalAccounts / limit),
        totalRecords: totalAccounts,
      },
    });
  } catch (error) {
    console.error(`[ERROR]: Failed to fetch accounts - ${error.message}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Delete all accounts
 */
const deleteAccounts = async (req, res) => {
  try {
    const result = await Account.deleteMany();
    res.status(200).json({
      success: true,
      message: "All accounts cleared",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error(`[ERROR]: Failed to delete accounts - ${error.message}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Get a single account by the authenticated user's ID
 */
const getAccount = async (req, res) => {
  try {
    const account = await Account.findOne({ user: req.user._id });

    if (!account) {
      return res.status(404).json({ success: false, message: "Account not found" });
    }

    res.status(200).json({ success: true, data: account });
  } catch (error) {
    console.error(`[ERROR]: Failed to fetch account for user ${req.user._id} - ${error.message}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  getAccounts,
  deleteAccounts,
  getAccount,
};
