const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    if (token.startsWith('Bearer ')) {
      // Remove 'Bearer ' from the token string
      console.log(token);
      const tokenValue = token.slice(7, token.length).trim();
      console.log(tokenValue);

      const decoded = jwt.verify(tokenValue, process.env.JWT_KEY);
      req.user = decoded;
      next();
    } else { return res.status(401).json({ msg: 'Token format is invalid' }); }

  }
  catch (error) {
    console.log(error);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
module.exports = authMiddleware;