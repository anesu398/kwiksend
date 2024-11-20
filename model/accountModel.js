const mongoose = require("mongoose");
const { generateAccountNumber, generatePin } = require("../utils/helper");

const accountSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },
    accountNumber: {
      type: Number,
      unique: true, // Ensure account numbers are unique
      required: [true, "Account number is required"],
    },
    pin: {
      type: Number,
      required: [true, "PIN is required"],
      minlength: [4, "PIN must be at least 4 digits"],
      maxlength: [6, "PIN must not exceed 6 digits"],
    },
    balance: {
      type: Number,
      required: [true, "Account balance is required"],
      default: 0,
      min: [0, "Balance cannot be negative"], // Enforce non-negative balance
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Pre-save hook to automatically generate accountNumber and PIN
accountSchema.pre("validate", function (next) {
  if (!this.accountNumber) {
    this.accountNumber = generateAccountNumber();
  }

  if (!this.pin) {
    this.pin = generatePin();
  }

  next();
});

// Static method to retrieve accounts by user ID
accountSchema.statics.findByUserId = async function (userId) {
  return this.find({ user: userId }).populate("user");
};

// Instance method to update the account balance
accountSchema.methods.updateBalance = async function (amount) {
  if (this.balance + amount < 0) {
    throw new Error("Insufficient funds");
  }
  this.balance += amount;
  await this.save();
};

// Ensure unique index for accountNumber at the database level
accountSchema.index({ accountNumber: 1 }, { unique: true });

module.exports = mongoose.model("Account", accountSchema);
