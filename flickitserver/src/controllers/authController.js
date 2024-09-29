const jwt = require("jsonwebtoken");
const User = require("../models/User_info"); // Adjust the path as necessary
const dotenv = require("dotenv");
dotenv.config();

exports.register = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    user = new User({
      username,
      email,
      password,
    });

    await user.save();

    // Generate token after successful registration
    const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'Registration successful', token });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check password (you should ideally hash passwords and compare hashed values)
    if (password !== user.password) {
      return res.status(400).json({ message: 'Invalid Password' });
    }

    // Generate token after successful login
    const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token, user });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updatePassword = async (req, res) => {
  const { username, newPassword } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserProfile = async (req, res) => {
  const { username } = req.query; 

  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }

  try {
    const user = await User.findOne({ username }); 
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      username: user.username, 
      email: user.email,
      location: "Cairo, Egypt", 
    });  
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Error fetching user data' });
  }
};

exports.updateUserProfile = async (req, res) => {
  const { username, newUsername, email } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.username = newUsername || user.username;
    user.email = email || user.email;

    await user.save();
    res.status(200).json(user); 
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Error updating profile' });
  }
};
