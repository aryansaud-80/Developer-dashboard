import { Router } from 'express';

const router = Router();

router.route('/create-todo').post(createTodo)

export default router;
