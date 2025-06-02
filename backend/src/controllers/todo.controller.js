import { Todo } from '../models/todo.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';

export const createTodo = asyncHandler(async (req, res, next) => {
  const { title, description, dueDate, priority } = req.body;

  if ([title, description, dueDate, priority].some((field) => field === '')) {
    throw new ApiError(
      400,
      'All fields (title, description, due date, and priority) are required.'
    );
  }
});
