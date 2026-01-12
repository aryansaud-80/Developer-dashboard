import { Router } from 'express';
import {
  getUser,
  loginUser,
  refresh,
  register,
  logoutUser,
  updateUser,
  deleteUser,
} from '../controllers/user.controller.js';
import { auth } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/auth/register').post(register);
router.route('/auth/login').post(loginUser);
router.route('/auth/refresh').post(refresh);
router.route('/auth/me').get(auth, getUser);
router.route('/auth/logout').post(auth, logoutUser);
router.route('/update').put(auth, updateUser);
router.route('/delete').delete(auth, deleteUser);

export default router;