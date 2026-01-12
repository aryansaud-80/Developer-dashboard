import { PomodoroHistory } from '../models/pomodoroHistory.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';

export const savePomodoroSession = asyncHandler(async (req, res, next) => {
  const userId = req.user?.id;
  const { sessionType, duration, completed } = req.body;

  if (!userId) {
    throw new ApiError(401, 'Unauthorized');
  }

  if (!sessionType || !duration) {
    throw new ApiError(400, 'Session type and duration are required');
  }

  const validSessionTypes = ['work', 'shortBreak', 'longBreak'];
  if (!validSessionTypes.includes(sessionType)) {
    throw new ApiError(400, 'Invalid session type');
  }

  const pomodoroSession = await PomodoroHistory.create({
    userId,
    sessionType,
    duration,
    completed: completed || false,
  });

  if (!pomodoroSession) {
    throw new ApiError(500, 'Failed to save pomodoro session');
  }

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        'Pomodoro session saved successfully',
        pomodoroSession
      )
    );
});

export const getPomodoroHistory = asyncHandler(async (req, res, next) => {
  const userId = req.user?.id;

  if (!userId) {
    throw new ApiError(401, 'Unauthorized');
  }

  const { days = 30 } = req.query;
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - parseInt(days));

  const history = await PomodoroHistory.find({
    userId,
    createdAt: { $gte: startDate },
  }).sort({ createdAt: -1 });

  const stats = {
    totalSessions: history.length,
    completedSessions: history.filter((h) => h.completed).length,
    totalWorkTime: history
      .filter((h) => h.sessionType === 'work')
      .reduce((sum, h) => sum + h.duration, 0),
    totalBreakTime: history
      .filter((h) => h.sessionType !== 'work')
      .reduce((sum, h) => sum + h.duration, 0),
    sessions: history,
  };

  res
    .status(200)
    .json(new ApiResponse(200, 'Pomodoro history fetched', stats));
});

export const getPomodoroStats = asyncHandler(async (req, res, next) => {
  const userId = req.user?.id;

  if (!userId) {
    throw new ApiError(401, 'Unauthorized');
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayStats = await PomodoroHistory.aggregate([
    {
      $match: {
        userId: require('mongoose').Types.ObjectId(userId),
        createdAt: { $gte: today },
      },
    },
    {
      $group: {
        _id: '$sessionType',
        count: { $sum: 1 },
        completed: {
          $sum: { $cond: ['$completed', 1, 0] },
        },
        totalDuration: { $sum: '$duration' },
      },
    },
  ]);

  res
    .status(200)
    .json(new ApiResponse(200, 'Daily pomodoro stats', todayStats));
});