import { Router } from 'express';
import { auth } from '../middlewares/auth.middleware.js';
import { fetchAndSaveGithubActivity } from '../controllers/github.controller.js';

const router = Router();

router.route('/save').post(auth, fetchAndSaveGithubActivity);

export default router;
