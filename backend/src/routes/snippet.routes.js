import { Router } from 'express';
import { auth } from '../middlewares/auth.middleware.js';
import {
  createSnippet,
  deleteSnippet,
  getAllSnippet,
  getSnippet,
  updateSnippet,
} from '../controllers/snippet.controller.js';

const router = Router();
router.route('/').post(auth, createSnippet).get(auth, getAllSnippet);
router
  .route('/:id')
  .get(auth, getSnippet)
  .patch(auth, updateSnippet)
  .delete(auth, deleteSnippet);
export default router;
