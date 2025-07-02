// src/controllers/userController.js

const User = require('../models/User');

// Get current user's profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ user });
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch profile', error: err.message });
    }
};

// Update user profile (optional)
exports.updateProfile = async (req, res) => {
    try {
        const { name } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user._id,
            { name },
            { new: true, runValidators: true }
        ).select('-password');
        res.json({ message: 'Profile updated', user });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update profile', error: err.message });
    }
};
