import User from '../models/User.js';
import Project from '../models/Project.js';

// @desc    Search users and projects by query
export const searchUsersAndProjects = async (req, res) => {
  const query = req.query.query || '';

  try {
    const userResults = await User.find({
      name: { $regex: query, $options: 'i' },
    }).select('name avatar bio');

    const projectResults = await Project.find({
      title: { $regex: query, $options: 'i' },
    }).populate('user', 'name avatar');

    res.json({
      users: userResults,
      projects: projectResults,
    });
  } catch (err) {
    res.status(500).json({ message: 'Search failed', error: err.message });
  }
};
