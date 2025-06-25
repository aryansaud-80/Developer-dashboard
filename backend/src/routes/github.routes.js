import { Router } from 'express';
import { auth } from '../middlewares/auth.middleware.js';
import {
  fetchAndSaveGithubActivity,
  getGithubData,
} from '../controllers/github.controller.js';

const router = Router();

router.route('/save').post(auth, fetchAndSaveGithubActivity);
router.route('/').get(auth, getGithubData);

export default router;
