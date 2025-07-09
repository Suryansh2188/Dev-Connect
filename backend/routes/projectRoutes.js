import express from 'express';
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  myProjects,
  updateProject,
} from '../controllers/projectController.js';
import { addComment, getProjectComments } from '../controllers/commentController.js';

import protect from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllProjects);
router.get('/me', protect, myProjects);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);
router.get('/:id', getProjectById);

// Protected route
router.post('/', protect, createProject);
// backend/routes/projectRoutes.js




// Comments
router.post('/:projectId/comments', protect, addComment);
router.get('/:projectId/comments', getProjectComments);

export default router;
