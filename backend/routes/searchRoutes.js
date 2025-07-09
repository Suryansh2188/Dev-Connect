import express from 'express';
import { searchUsersAndProjects } from '../controllers/searchController.js';

const router = express.Router();

router.get('/', searchUsersAndProjects);

export default router;
