const adminAuth = (req, res, next) => {
    try {
      // Ensure the user object is attached to the request
      if (!req.user) {
        return res.status(401).json({
          message: "Unauthorized: No user data attached to the request",
        });
      }
  
      // Check if the user has the 'admin' role
      if (req.user.role !== "admin") {
        return res.status(403).json({
          message: "Forbidden: You need admin privileges to access this resource",
        });
      }
  
      // Check if the user account is active (optional: this can be extended based on your use case)
      if (!req.user.isActive) {
        return res.status(403).json({
          message: "Forbidden: Your account is deactivated, contact support",
        });
      }
  
      // Continue to the next middleware or controller if the user is authorized
      next();
    } catch (error) {
      console.error(`Admin authorization error: ${error.message}`, {
        userId: req.user ? req.user._id : null, // Log user ID (if available) for debugging
        route: req.originalUrl, // Log the route for better tracking
      });
  
      // Send a detailed internal error response with a generic message
      res.status(500).json({
        message: "Internal server error: Something went wrong during authorization",
        error: process.env.NODE_ENV === "development" ? error.message : undefined, // Show detailed error in dev mode
      });
    }
  };
  
  module.exports = { adminAuth };
  