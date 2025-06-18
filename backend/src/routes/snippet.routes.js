import { Router } from 'express';
import { auth } from '../middlewares/auth.middleware.js';
import { createSnippet } from '../controllers/snippet.controller.js';

const router = Router();

router.route('/').post(auth, createSnippet);

export default router;
