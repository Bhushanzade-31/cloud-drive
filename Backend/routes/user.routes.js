const express = require('express');
const router = express.Router();
const { body } = require("express-validator");
const userController = require('../controllers/user.controller');
const { authUser } = require('../middlewares/auth.middleware');
const userModel = require('../models/user.model');  // <-- Import userModel here

// Route for user registration
router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
    userController.registerUser
);

// Route for user login
router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
    userController.loginUser
);

// Route for uploading user profile image URL
router.post('/upload-url', authUser, userController.updateUserImageUrl);

// Route to fetch user data
router.get("/user", authUser, async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id); // <-- Correct reference to userModel

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.imageUrls); // Assuming `imageUrls` is an array in the user document
  } catch (err) {
    console.error("Error in /api/user:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
