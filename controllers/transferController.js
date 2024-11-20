const User = require("../model/userModel");
const Account = require("../model/accountModel");
const Transfer = require("../model/transferModel");

/**
 * Make a transfer between accounts
 */
const makeTransfer = async (req, res) => {
  try {
    const { accountNumber, amount, name } = req.body;

    // Validate input
    if (!accountNumber || !amount || !name) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const receiver = await Account.findOne({ accountNumber }).populate("user");

    if (!receiver) {
      return res.status(400).json({ success: false, message: "Invalid account number" });
    }

    // Check if the receiver's name matches
    if (receiver.user.name.toLowerCase() !== name.toLowerCase()) {
      return res.status(400).json({ success: false, message: "Name does not match the account" });
    }

    const sender = await Account.findOne({ user: req.user._id });
    if (!sender) {
      return res.status(400).json({ success: false, message: "Sender account not found" });
    }

    // Ensure sender has sufficient balance
    if (sender.balance < amount) {
      return res.status(400).json({ success: false, message: "Insufficient balance" });
    }

    // Perform the transfer
    sender.balance -= amount;
    receiver.balance += amount;

    await sender.save();
    await receiver.save();

    // Create a transfer record
    const transfer = await Transfer.create({
      senderId: req.user._id,
      receiverId: receiver.user._id,
      amount,
    });

    console.log(`[INFO]: Transfer successful - Sender: ${sender.user}, Receiver: ${receiver.user}`);
    res.status(200).json({ success: true, data: transfer });
  } catch (error) {
    console.error(`[ERROR]: Transfer failed - ${error.message}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Delete all transfer records (admin use only)
 */
const deleteTransfers = async (req, res) => {
  try {
    const result = await Transfer.deleteMany();
    res.status(200).json({
      success: true,
      message: "All transfers cleared",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error(`[ERROR]: Failed to delete transfers - ${error.message}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Get all transfers for the logged-in user
 */
const getTransfers = async (req, res) => {
  try {
    const userId = req.user._id;

    const transfers = await Transfer.find({
      $or: [{ senderId: userId }, { receiverId: userId }],
    })
      .sort({ createdAt: -1 })
      .populate("receiverId", "name accountNumber") // Populate receiver details
      .populate("senderId", "name accountNumber"); // Populate sender details

    if (!transfers || transfers.length === 0) {
      return res.status(404).json({ success: false, message: "No transfers found" });
    }

    res.status(200).json({ success: true, data: transfers });
  } catch (error) {
    console.error(`[ERROR]: Failed to fetch transfers - ${error.message}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  makeTransfer,
  deleteTransfers,
  getTransfers,
};
