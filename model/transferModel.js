const mongoose = require("mongoose");

const transferSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Sender ID is required"],
      ref: "User",
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Receiver ID is required"],
      ref: "User",
    },
    amount: {
      type: Number,
      required: [true, "Transfer amount is required"],
      min: [0.01, "Transfer amount must be greater than 0"],
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    description: {
      type: String,
      maxlength: [255, "Description must not exceed 255 characters"],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Middleware: Prevent transfers between the same user
transferSchema.pre("validate", function (next) {
  if (this.senderId.toString() === this.receiverId.toString()) {
    return next(new Error("Sender and receiver cannot be the same user"));
  }
  next();
});

// Static Method: Retrieve transfers by user
transferSchema.statics.findByUserId = async function (userId) {
  return this.find({
    $or: [{ senderId: userId }, { receiverId: userId }],
  })
    .sort({ createdAt: -1 })
    .populate("senderId", "name email") // Include only necessary fields
    .populate("receiverId", "name email");
};

// Instance Method: Update status
transferSchema.methods.updateStatus = async function (newStatus) {
  if (!["pending", "completed", "failed"].includes(newStatus)) {
    throw new Error("Invalid status update");
  }
  this.status = newStatus;
  await this.save();
};

// Virtual Field: Summary
transferSchema.virtual("summary").get(function () {
  return `Transfer of $${this.amount} from ${this.senderId} to ${this.receiverId}`;
});

// Indexing for faster lookups
transferSchema.index({ senderId: 1, receiverId: 1, createdAt: -1 });

module.exports = mongoose.model("Transfer", transferSchema);
