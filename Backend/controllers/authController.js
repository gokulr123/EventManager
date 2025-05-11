const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { ustId,userName, password, confirmPassword, gender, gmail, dateOfBirth } = req.body;
    if (password !== confirmPassword) return res.status(400).json({ message: "Passwords do not match" });
      // Age validation: must be 18 or older
      const dob = new Date(dateOfBirth);
      const today = new Date();
  
      const age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      const dayDiff = today.getDate() - dob.getDate();
  
      const isUnder18 = age < 18 || (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)));
  
      if (isUnder18) {
        return res.status(400).json({ message: "You must be at least 18 years old to register" });
      }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ ustId,userName, password: hashedPassword, gender, gmail, dateOfBirth });
    await newUser.save();
    res.status(201).json({ message: "User registered" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { ustId, password } = req.body;
    const user = await User.findOne({ ustId });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id,isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
