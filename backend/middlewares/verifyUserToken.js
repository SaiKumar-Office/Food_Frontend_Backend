const User = require('../models/User'); // Import the User model
const jwt = require('jsonwebtoken');
const dotEnv = require('dotenv');

dotEnv.config();

const secretKey = process.env.SECRET_KEY;

// Middleware to verify JWT token for User
const verifyToken = async (req, res, next) => {
    const token = req.headers.token; // Extract token from the request headers

    if (!token) {
        return res.status(401).json({ error: "Token is required" }); // Return error if no token is provided
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, secretKey);

        // Find the user associated with the token
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" }); // Return error if user is not found
        }

        // Attach user ID to the request object
        req.userId = user._id;

        // Call the next middleware or route handler
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Invalid token" }); // Return error if token verification fails
    }
}

module.exports = verifyToken;
