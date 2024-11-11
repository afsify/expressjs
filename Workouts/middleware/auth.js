const jwt = require("jsonwebtoken");

// Secret key (In production, use environment variables for security)
const SECRET_KEY = "your_secret_key";

// Middleware function to verify JWT
const verifyToken = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.headers["authorization"];

  // Check if token is provided
  if (!token) {
    return res.status(403).json({ message: "Access denied, token missing" });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token.split(" ")[1], SECRET_KEY);
    req.user = decoded; // Attach decoded token data to the request
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Export the middleware function for use in other files
module.exports = verifyToken;
