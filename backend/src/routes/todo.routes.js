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

router.route('/todos').post(createTodo).get(getAllTodo);       
router.route('/todos/:id').get(getTodo).patch(updateTodo).delete(deleteTodo); 
router.route('/todos/:id/status').patch(updateStatus);      


export default router;
