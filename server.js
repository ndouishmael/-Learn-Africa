const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');

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

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// Route for the root URL ("/") to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// User Registration
app.post('/register', async (req, res) => {
     console.log(req.body); // Add this line for logging
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

    // Remaining code for updating username endpoint...
});

// Update Email
app.put('/settings/email', async (req, res) => {
    const { email } = req.body;

    // Remaining code for updating email endpoint...
});

// Update Password
app.put('/settings/password', async (req, res) => {
    const { password } = req.body;

    // Remaining code for updating password endpoint...
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
