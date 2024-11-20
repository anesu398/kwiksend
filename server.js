// Load environment variables from .env file at the very start
const dotenv = require("dotenv").config();

// Basic imports
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");

// Import routes
const userRoutes = require("./routes/userRoutes");
const transferRoutes = require("./routes/transferRoutes");
const accountRoutes = require("./routes/accountRoutes");

// Connect to database
connectDB();

// Middleware setup
app.use(cookieParser()); // Cookie parsing middleware
app.use(express.json());  // Body parser middleware
app.use(express.urlencoded({ extended: true })); // URL-encoded data handling

// Security middleware
app.use(helmet()); // Protects against well-known vulnerabilities

// CORS middleware (allow cross-origin requests)
app.use(cors({
  origin: process.env.CLIENT_URL || "*", // Adjust allowed origins if needed
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

// Logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); // Log HTTP requests in development mode
}

// Rate limiting to prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter); // Apply rate limiting globally

// Set up routes
app.use("/users", userRoutes);
app.use("/transfer", transferRoutes);
app.use("/accounts", accountRoutes);

// Error handling middleware (for async errors)
app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
