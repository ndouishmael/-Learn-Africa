const jwt = require('jsonwebtoken');

// Middleware function to verify JWT token
function verifyToken(req, res, next) {
    // Get token from request headers
    const token = req.headers['authorization'];

    // Check if token is present
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded user information to request object
        next(); // Move to next middleware or route handler
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token.' });
    }
}

module.exports = { verifyToken };
