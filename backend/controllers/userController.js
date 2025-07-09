import User from '../models/User.js';

// @desc    Get user profile
export const getUserProfile = async (req, res) => {
  const user = req.user;
  res.json(user);
};

// @desc    Update user profile
export const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const { name, bio, avatar } = req.body;
    if (name) user.name = name;
    if (bio) user.bio = bio;
    if (avatar) user.avatar = avatar;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};
