import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getTodosByUserId,
  getTodo,
  updateStatus,
  updateTodo,
} from "../controllers/todo.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").post(auth, createTodo).get(auth, getTodosByUserId);
router
  .route("/:id")
  .get(auth, getTodo)
  .put(auth, updateTodo)
  .delete(auth, deleteTodo);
router.route("/:id/status").patch(auth, updateStatus);

export default router;
