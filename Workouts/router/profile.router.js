// profile.router.js
const express = require("express");
const verifyToken = require("../middleware/auth"); // Import the auth middleware

const router = express.Router();

// Define the protected profile route
router.get("/profile", verifyToken, (req, res) => {
  // Access the decoded user data from the token
  res.json({
    message: "Profile data",
    user: req.user, // contains decoded data like user ID, username, etc.
  });
});

module.exports = router;
