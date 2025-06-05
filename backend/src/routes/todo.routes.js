import { Router } from 'express';
import {
  createTodo,
  deleteTodo,
  getAllTodo,
  getTodo,
  updateStatus,
  updateTodo,
} from '../controllers/todo.controller.js';

const router = Router();

router.route('/').post(createTodo).get(getAllTodo);       
router.route('/:id').get(getTodo).patch(updateTodo).delete(deleteTodo); 
router.route('/:id/status').patch(updateStatus);      


export default router;
