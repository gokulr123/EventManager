const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {

  const token = req.headers['authorization']?.split(' ')[1]; // Extract the token from the Authorization header
  
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }
    // Token is valid, save the decoded data to the request object for use in subsequent routes
    req.userId = decoded.id; // Assuming the token contains the user's id
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = verifyToken;
