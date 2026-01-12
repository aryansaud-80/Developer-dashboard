import { Router } from "express";
import {
  savePomodoroSession,
  getPomodoroHistory,
  getPomodoroStats,
} from "../controllers/pomodoro.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/save").post(auth, savePomodoroSession);
router.route("/history").get(auth, getPomodoroHistory);
router.route("/stats").get(auth, getPomodoroStats);

export default router;
