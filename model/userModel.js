const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [50, "Name cannot exceed 50 characters"],
      trim: true, // Removes unnecessary whitespace
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true, // Ensures email is stored in lowercase
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address",
      ], // Email regex validation
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false, // Excludes password by default in queries
    },
    role: {
      type: String,
      enum: ["user", "admin"], // Restricts roles to predefined values
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Pre-save middleware: Hash password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(12); // Increased salt rounds for security
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Instance method: Check password match
userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// Static method: Find active users
userSchema.statics.findActiveUsers = function () {
  return this.find({ isActive: true });
};

// Virtual property: Get full name or other user info
userSchema.virtual("profile").get(function () {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    role: this.role,
    isActive: this.isActive,
  };
});

// Indexing for faster querying
userSchema.index({ email: 1 });

module.exports = mongoose.model("User", userSchema);
