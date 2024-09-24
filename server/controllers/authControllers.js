const bcrypt = require('bcryptjs');
const User = require('../models/userModel');


const register = async (req, res) => {
  const { name, email, phone, role, password } = req.body;

  try {
    
    //checking if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: 'User already exists' });

    // hash password
    const hashedPassword = await bcrypt.hash(password, 12);
  
    //create new user
    const user = new User({
      name,
      email,
      phone,
      role: role || 'user',
      password: hashedPassword,
    });
    await user.save();
res.status(201).json({ message: 'User registered successfully!' });


    //generating token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_KEY, { expiresIn: '1h' });

    res.json({ token, user: { id: user_id, name: user.name, email: user.email, phone: user.phone, role: user.role } });


  }
  catch (error) {
    res.status(500).json({ error: ' server error' });
  }

};


module.exports = { register };