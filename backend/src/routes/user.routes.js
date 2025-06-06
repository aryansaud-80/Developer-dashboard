import { Router } from 'express';
import {
  getUser,
  loginUser,
  refresh,
  register,
} from '../controllers/user.controller.js';
import { auth } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/auth/register').post(register);
router.route('/auth/login').post(loginUser);
router.route('/auth/refresh').post(refresh);
router.route('/auth/me').get(auth, getUser);

export default router;
