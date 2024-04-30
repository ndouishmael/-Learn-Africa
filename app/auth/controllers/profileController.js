// Import necessary modules and dependencies
const User = require('../models/User');

// Controller functions for user profiles
const profileController = {
  // Function to get user profile
  getProfile: async (req, res) => {
    try {
      // Get user ID from request
      const userId = req.userId;

      // Find user in database by ID
      const user = await User.findById(userId);

      // Check if user exists
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Send user profile as response
      res.status(200).json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Function to update user profile
  updateProfile: async (req, res) => {
    try {
      // Get user ID from request
      const userId = req.userId;

      // Extract updated profile data from request body
      const { username, email } = req.body;

      // Find user in database by ID and update profile
      const updatedUser = await User.findByIdAndUpdate(userId, { username, email }, { new: true });

      // Check if user exists
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Send updated user profile as response
      res.status(200).json({ user: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Function to delete user profile
  deleteProfile: async (req, res) => {
    try {
      // Get user ID from request
      const userId = req.userId;

      // Find user in database by ID and delete profile
      const deletedUser = await User.findByIdAndDelete(userId);

      // Check if user exists
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Send success message as response
      res.status(200).json({ message: 'User profile deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

// Export the profileController object
module.exports = profileController;
