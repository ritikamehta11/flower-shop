const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { name, email, phone, role, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: 'User already exists' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 6);

    // Create new user
    const user = new User({
      name,
      email,
      phone,
      role: role || 'user',
      password: hashedPassword,
    });
    await user.save();

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: '30d' }
    );

   
    return res.status(201).json({
      message: 'User registered successfully!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Server error' });
  }
};




const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: '14d' }
    );

    // Return the token and user details
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Login error: ", error);  // Log the error for debugging
    res.status(500).json({ error: "Server error" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.log(error);
    // res.status(500).json({ error: error });
  }
};

const deleteUsers = async (req, res) => {
  const { id } = req.params;
 try {
    // Attempt to find and delete the user
    const user = await User.findByIdAndDelete(id);

    // Check if the user was found and deleted
    if (!user) {
      return res.status(404).json({ message: 'User not found' }); // Return 404 if not found
    }

    // Return the deleted user data
    res.status(200).json({ message: 'User deleted successfully', user });
  } catch (error) {
    // Handle any errors that occur
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
}

module.exports = { register, login, getUsers , deleteUsers};
