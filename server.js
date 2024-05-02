const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/learn-africa-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define user schema
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

// Define user model
const User = mongoose.model('User', userSchema);

// Middleware
app.use(bodyParser.json());

// Define secret key for JWT signing
const secretKey = 'mySuperSecretKey123';

// User Registration
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// User Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// Update Username
app.put('/settings/username', async (req, res) => {
    const { username } = req.body;

    // Authenticate user
    // Example:
    // const token = req.headers.authorization;
    // if (!token) {
    //     return res.status(401).json({ message: 'Unauthorized' });
    // }

    // Validate username
    // Example:
    // if (!username) {
    //     return res.status(400).json({ message: 'Username is required' });
    // }

    try {
        // Update username in the database
        // Example:
        // const userId = decoded.userId;
        // await User.findByIdAndUpdate(userId, { username });
        
        res.status(200).json({ message: 'Username updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// Update Email
app.put('/settings/email', async (req, res) => {
    const { email } = req.body;

    try {
        // Update email in the database
        // Example:
        // const userId = decoded.userId;
        // await User.findByIdAndUpdate(userId, { email });

        res.status(200).json({ message: 'Email updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// Update Password
app.put('/settings/password', async (req, res) => {
    const { password } = req.body;

    try {
        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update password in the database
        // Example:
        // const userId = decoded.userId;
        // await User.findByIdAndUpdate(userId, { password: hashedPassword });

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
