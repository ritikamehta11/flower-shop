const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');

  // If no token is found, return an unauthorized response
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    // Ensure the token starts with "Bearer "
    if (token.startsWith('Bearer ')) {
      // Extract the token after 'Bearer '
      const tokenValue = token.slice(7, token.length).trim();
      console.log('Token:', tokenValue); // For debugging, can be removed later

      // Verify the token using the secret key
      const decoded = jwt.verify(tokenValue, process.env.JWT_KEY);
      req.user = decoded; // Attach decoded user information to the request object
      next(); // Proceed to the next middleware
    } else {
      return res.status(401).json({ msg: 'Token format is invalid' });
    }
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authMiddleware;

