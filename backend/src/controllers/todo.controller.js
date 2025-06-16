import { Todo } from '../models/todo.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';

export const createTodo = asyncHandler(async (req, res, next) => {
  const { title, description, dueDate } = req.body;
  console.log(dueDate);

  const userId = req.user?.id;

  if (!userId) {
    throw new ApiError(401, 'Unauthorized to create a todo!');
  }

  if ([title, description, dueDate].some((field) => field?.trim() === '')) {
    throw new ApiError(
      400,
      'All fields (title, description, due date, and priority) are required.'
    );
  }

  if (new Date() > new Date(dueDate)) {
    throw new ApiError(400, "Due date cannot be less than today's date");
  }

  const todo = await Todo.create({
    title,
    description,
    dueDate: new Date(dueDate),
    userId,
  });

  if (!todo) {
    throw new ApiError(500, 'Failed to create a todo!');
  }

  res.status(201).json(new ApiResponse(201, 'Todo created successfully', todo));
});

export const updateTodo = asyncHandler(async (req, res, next) => {
  const todoId = req.params.id;
  const userId = req.user?.id;

  if (!userId) {
    throw new ApiError(401, 'Unauthorized!');
  }

  if (!todoId) {
    throw new ApiError(400, 'Todo id is required!');
  }

  const todo = await Todo.findById(todoId);
  const { title, description, dueDate } = req.body;

  if (!todo) {
    throw new ApiError(404, 'Failed to find todo!');
  }

  if (todo.userId.toString() !== userId) {
    throw new ApiError(403, 'You are not authorized to modify this todo.');
  }

  if ([title, description, dueDate].some((field) => field.trim() === '')) {
    throw new ApiError(400, 'All field are required');
  }

  if (Date.now() > new Date(dueDate)) {
    throw new ApiError(400, "Due date cannot be less than today's date");
  }

  const updatedTodo = await Todo.findByIdAndUpdate(
    todoId,
    {
      title: title,
      description: description,
      dueDate: dueDate,
    },
    {
      new: true,
    }
  );

  if (!updatedTodo) {
    throw new ApiError(500, 'Failed to update todo!');
  }

  res
    .status(200)
    .json(new ApiResponse(200, 'Todo updated successfully', updatedTodo));
});

export const deleteTodo = asyncHandler(async (req, res, next) => {
  const todoId = req.params.id;
  const userId = req.user?.id;

  if (!userId) {
    throw new ApiError(401, 'Unauthorized!');
  }

  if (!todoId) {
    throw new ApiError(400, 'todoId is required to delete todo!');
  }

  const todo = await Todo.findById(todoId);

  if (!todo) {
    throw new ApiError(500, 'Failed to find todo!');
  }

  if (todo.userId.toString() !== userId) {
    throw new ApiError(403, 'You are not authorized to modify this todo.');
  }

  const deletedTodo = await Todo.findByIdAndDelete(todoId);

  if (!deletedTodo) {
    throw new ApiError(404, 'Failed to delete todo!');
  }

  res
    .status(200)
    .json(new ApiResponse(200, 'Todo deleted successfully', deletedTodo));
});

export const updateStatus = asyncHandler(async (req, res, next) => {
  const todoId = req.params.id;
  const userId = req.user?.id;

  if (!userId) {
    throw new ApiError(401, 'Unauthorized!');
  }

  if (!todoId) {
    throw new ApiError(400, 'todoId is required!');
  }

  const todo = await Todo.findById(todoId);

  if (!todo) {
    throw new ApiError(400, 'Failed to find todo!');
  }

  if (todo.userId.toString() !== userId) {
    throw new ApiError(403, 'You are not authorized to modify this todo.');
  }

  const { completed } = req.body;

  if (typeof completed !== 'boolean') {
    throw new ApiError(400, 'A boolean "completed" value is required!');
  }

  const completeTodo = await Todo.findByIdAndUpdate(
    todoId,
    {
      completed: completed,
    },
    {
      new: true,
    }
  );

  if (!completeTodo) {
    throw new ApiError(500, 'Failed update todo completion status!');
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        'Todo completion status updated successfully',
        completeTodo
      )
    );
});

export const getTodo = asyncHandler(async (req, res, next) => {
  const todoId = req.params.id;
  const userId = req.user?.id;

  if (!userId) {
    throw new ApiError(401, 'Unauthorized!');
  }

  if (!todoId) {
    throw new ApiError(400, 'Requires todoId!');
  }

  const todo = await Todo.findById(todoId);

  if (!todo) {
    throw new ApiError(404, 'Failed to find todo!');
  }

  if (todo.userId.toString() !== userId) {
    throw new ApiError(401, 'You are not authorized to access the todo');
  }

  res.status(200).json(new ApiResponse(200, 'Successfully fetched todo', todo));
});

export const getAllTodo = asyncHandler(async (req, res, next) => {
  const { completed } = req.query;
  const userId = req.user?.id;

  if (!userId) {
    throw new ApiError(401, 'Unauthorized!');
  }

  const filter = { userId };
  if (completed !== undefined) {
    filter.completed = completed === 'true';
  }

  const todos = await Todo.find(filter);

  res
    .status(200)
    .json(new ApiResponse(200, 'Todo fetched successfully', todos));
});
