const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Authentication middleware to verify JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token.' });
    req.user = user;
    next();
  });
}

// Centralized error handling middleware
function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(err.statusCode || 500).json({ error: err.message || 'Internal server error' });
}

module.exports = {
  authenticateToken,
  errorHandler,
};
