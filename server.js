const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

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

// Routes

// Register a new user
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    
    // Check if user already exists
    User.findOne({ email })
        .then(user => {
            if (user) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // Create new user
            return User.create({ username, email, password });
        })
        .then(newUser => res.status(201).json({ message: 'User registered successfully', user: newUser }))
        .catch(err => res.status(500).json({ message: 'Internal server error', error: err.message }));
});

// User login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Find user in the database
    User.findOne({ email, password })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            return res.status(200).json({ message: 'Login successful', user });
        })
        .catch(err => res.status(500).json({ message: 'Internal server error', error: err.message }));
});

// Fetch user profile
app.get('/profile/:username', (req, res) => {
    const { username } = req.params;

    // Find user in the database
    User.findOne({ username })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            return res.status(200).json({ message: 'User profile found', user });
        })
        .catch(err => res.status(500).json({ message: 'Internal server error', error: err.message }));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
