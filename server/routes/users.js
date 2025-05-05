const express = require('express'); // Importing Express to create the router
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController'); // Importing controller functions for user actions
const { protect } = require('../middleware/authMiddleware'); // Importing middleware to protect routes requiring authentication
const router = express.Router(); // Creating a new Express router

// Route for user registration
router.post('/register', registerUser);

// Route for user login
router.post('/login', loginUser);

// Protected route for getting the user's profile
router.get('/profile', protect, getUserProfile); // protect middleware ensures that only authenticated users can access this route

module.exports = router; // Exporting the router for use in the main app
