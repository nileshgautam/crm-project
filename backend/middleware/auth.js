const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET; // Use .env in real apps

console.log(JWT_SECRET);

// Verify token and attach user to request
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader)
    return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Check for specific role(s)
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }
    next();
  };
};

module.exports = {
  authenticate,
  authorize
};
