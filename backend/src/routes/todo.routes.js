import { Router } from 'express';
import { createTodo } from '../controllers/todo.controller.js';

const router = Router();

router.route('/create-todo').post(createTodo);

export default router;
