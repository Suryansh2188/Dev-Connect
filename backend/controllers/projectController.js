import Project from '../models/Project.js';
import Comment from '../models/Comment.js';

// @desc    Create a new project
export const createProject = async (req, res) => {
  const { title, description, link } = req.body;

  try {
    const project = new Project({
      user: req.user._id,
      title,
      description,
      link,
    });

    const createdProject = await project.save();
    res.status(201).json(createdProject);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create project', error: err.message });
  }
};

// @desc    Get all projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate('user', 'name avatar');
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch projects', error: err.message });
  }
};

// @desc    Get a single project by ID
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('user', 'name avatar');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch project', error: err.message });
  }
};

export const myProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user._id });
    res.json(projects); // Return array
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    if (project.user.toString() !== req.user._id.toString())
      return res.status(401).json({ message: 'Not authorized' });

    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    if (project.user.toString() !== req.user._id.toString())
      return res.status(401).json({ message: 'Not authorized' });

    await Project.findByIdAndDelete(req.params.id);
    // Optionally, you can also delete associated comments here if needed
     await Comment.deleteMany({ project: req.params.id });
    res.json({ message: 'Project deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
};
