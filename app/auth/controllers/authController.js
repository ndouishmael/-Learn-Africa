// Import necessary modules and dependencies
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Controller functions for user authentication
const authController = {
  // Function to register a new user
  register: async (req, res) => {
    try {
      // Extract user details from request body
      const { username, email, password } = req.body;

      // Check if user already exists in the databases
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user instance
      user = new User({ username, email, password: hashedPassword });

      // Save the user to the database
      await user.save();

      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Send response with token
      res.status(201).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Function to log in a user
  login: async (req, res) => {
    try {
      // Extract login credentials from request body
      const { email, password } = req.body;

      // Check if user exists in the database
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Verify password
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Send response with token
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

// Export the authController object
module.exports = authController;
