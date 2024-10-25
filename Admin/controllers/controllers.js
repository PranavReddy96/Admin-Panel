import User from '../models/User.js';
import ActivityLog from '../models/ActivityLog.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// User Management Controllers

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

// Create a new user
export const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedpassword=await bcrypt.hash(password,10);
    const newUser = new User({ username, email, password:hashedpassword });
    await newUser.save();

    // Log activity
    await new ActivityLog({ userId: newUser._id, action: 'Created new user' }).save();


    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message});
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email });
  if (!user) {
      return res.status(400).json({ message: 'Invalid credentials.' });
  }

  const isMatch =await bcrypt.compare(password, user.password);
  if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
  }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
  res.status(200).json({ message: 'Login successful',user, token });
};
// Update a user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, role } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, { username, email, role }, { new: true });
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    // Log activity
    await new ActivityLog({ userId: updatedUser._id, action: 'Updated user' }).save();

    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: 'Error updating user' });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });

    // Log activity
    await new ActivityLog({ userId: deletedUser._id, action: 'Deleted user' }).save();

    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
};

// Analytics Controllers

// Get user activity logs
export const getUserActivity = async (req, res) => {
  try {
    const activityLogs = await ActivityLog.find().populate('userId', 'username email');
    res.json(activityLogs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching activity logs' });
  }
};
