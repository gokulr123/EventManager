// middleware/isAdmin.js
const User = require('../models/User'); // Adjust path as needed

const isAdmin = async (req, res, next) => {
  try {
    const userId = req.user.id; // Assuming you've added user info via JWT middleware
    const user = await User.findById(userId);

    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Error verifying admin access' });
  }
};

module.exports = isAdmin;
