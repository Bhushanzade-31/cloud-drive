 const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');

const blackListTokenModel = require('../models/blacklistToken.model');


module.exports.registerUser = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password,imageUrl } = req.body;

    const isUserAlready = await userModel.findOne({ email });

    if (isUserAlready) {
        return res.status(400).json({ message: 'User already exist' });
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        imageUrl,
    });

    const token = user.generateAuthToken();

    res.status(201).json({ token, user });


}

module.exports.loginUser = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select('+password');

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = user.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({ token, user });
}

module.exports.getUserProfile = async (req, res, next) => {

    res.status(200).json(req.user);

}



exports.updateUserImageUrl = async (req, res) => {
  const { imageUrl } = req.body;

  if (!imageUrl) {
    return res.status(400).json({ error: "Missing imageUrl" });
  }

  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id, 
      { $push: { imageUrls: imageUrl } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "Profile image updated successfully",
      userId: updatedUser._id,
      imageUrls: updatedUser.imageUrls,
    });
  } catch (err) {
    console.error("Error updating image URL:", err);
    res.status(500).json({ error: "Server error" });
  }
};
