import Comment from '../models/Comment.js';
import Project from '../models/Project.js';

// @desc    Add comment to a project
export const addComment = async (req, res) => {
  const { text } = req.body;
  const projectId = req.params.projectId;

  try {
    const comment = new Comment({
      project: projectId,
      user: req.user._id,
      text,
    });

    const savedComment = await comment.save();
    // Add comment reference to the project
    await Project.findByIdAndUpdate(projectId, {
      $push: { comments: savedComment._id },
    });
    const populatedComment = await savedComment.populate('user', 'name avatar');
    res.status(201).json(populatedComment);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add comment', error: err.message });
  }
};

// @desc    Get comments for a project
export const getProjectComments = async (req, res) => {
  try {
    const comments = await Comment.find({ project: req.params.projectId })
      .populate('user', 'name avatar')
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch comments', error: err.message });
  }
};
