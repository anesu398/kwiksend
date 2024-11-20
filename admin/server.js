const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();

const app = express();

// Middleware to parse cookies and JSON body
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS if needed
app.use(cors());

// Example API route (replace with actual logic)
app.use("/api", require("./routes/apiRoutes"));

// Serve the React app's static files
const clientBuildPath = path.join(__dirname, "client/build");
app.use(express.static(clientBuildPath));

// Serve CSS, JS, and other assets directly
app.get("*.css", (req, res) => {
  res.sendFile(path.join(clientBuildPath, req.url));
});

app.get("*.js", (req, res) => {
  res.sendFile(path.join(clientBuildPath, req.url));
});

// Catch-all route to serve the React app's index.html for all non-API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

// Start the Express server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
