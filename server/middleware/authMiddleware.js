const jwt = require('jsonwebtoken'); // Importing the 'jsonwebtoken' library for working with JSON Web Tokens (JWT)
const User = require('../models/User'); // Import the User model to fetch user data from the database

// Middleware to protect routes (check if the user is authenticated)
exports.protect = async (req, res, next) => {
  let token;

  // Check if the request has an authorization header and that it starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract the token from the authorization header
      token = req.headers.authorization.split(' ')[1]; // "Bearer <token>"

      // Verify the token using JWT secret key from environment variables
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get the user information from the database using the ID from the decoded token
      req.user = await User.findById(decoded.id).select('-password'); // Exclude the password field for security reasons

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      // If the token is invalid or expired, respond with an error
      res.status(401).json({ success: false, error: 'Not authorized, token failed' });
    }
  }

  // If no token is found in the request, send an error response
  if (!token) {
    res.status(401).json({ success: false, error: 'Not authorized, no token' });
  }
};

// Middleware to check if the user is an admin
exports.admin = (req, res, next) => {
  // Check if the user object is present and if the user is an admin
  if (req.user && req.user.isAdmin) {
    // If the user is an admin, proceed to the next middleware or route handler
    next();
  } else {
    // If the user is not an admin, respond with a 401 Unauthorized error
    res.status(401).json({ success: false, error: 'Not authorized as an admin' });
  }
};
