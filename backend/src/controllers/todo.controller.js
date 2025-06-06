import { Todo } from '../models/todo.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';

//TODO need to implement authorization later

export const createTodo = asyncHandler(async (req, res, next) => {
  const { title, description, dueDate, priority } = req.body;

  const userId = req.user?.id;

  if (!userId) {
    throw new ApiError(401, 'Unauthorized to create a todo!');
  }

  if ([title, description, dueDate, priority].some((field) => field === '')) {
    throw new ApiError(
      400,
      'All fields (title, description, due date, and priority) are required.'
    );
  }

  const todo = await Todo.create({
    title,
    description,
    dueDate,
    priority,
    userId
  });

  if (!todo) {
    throw new ApiError(500, 'Failed to create a todo!');
  }

  res.status(201).json(new ApiResponse(201, 'Todo created successfully', todo));
});

export const updateTodo = asyncHandler(async (req, res, next) => {
  const todoId = req.params.id;

  if (!todoId) {
    throw new ApiError(400, 'Todo id is required!');
  }

  const todo = await Todo.findById(todoId);
  const { title, description, dueDate, priority } = req.body;

  if (!todo) {
    throw new ApiError(404, 'The todo with given id is not found!');
  }

  const updatedTodo = await Todo.findByIdAndUpdate(
    todoId,
    {
      title: title || todo.title,
      description: description || todo.description,
      dueDate: dueDate || todo.dueDate,
      priority: priority || todo.priority,
    },
    {
      new: true,
    }
  );

  if (!updatedTodo) {
    throw new ApiError(500, 'Failed to update todo!');
  }

  res
    .status(201)
    .json(new ApiResponse(201, 'Todo updated successfully', updatedTodo));
});

export const deleteTodo = asyncHandler(async (req, res, next) => {
  const todoId = req.params.id;

  if (!todoId) {
    throw new ApiError(400, 'todoId is required to delete todo!');
  }

  try {
    await Todo.findByIdAndDelete(todoId);
  } catch (error) {
    throw new ApiError(500, 'Failed to delete todo!');
  }

  res.status(200).json(new ApiResponse(200, 'Todo deleted successfully'));
});

export const updateStatus = asyncHandler(async (req, res, next) => {
  const todoId = req.params.id;

  if (!todoId) {
    throw new ApiError(400, 'todoId is required!');
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

  if (!todoId) {
    throw new ApiError(400, 'Requires todoId!');
  }

  const todo = await Todo.findById(todoId);

  if (!todo) {
    throw new ApiError(404, 'Failed to find todo!');
  }

  res.status(200).json(new ApiResponse(200, 'Successfully fetched todo', todo));
});

export const getAllTodo = asyncHandler(async (req, res, next) => {
  const { completed } = req.query;

  const filter = {};
  if (completed !== undefined) {
    filter.completed = completed === 'true';
  }

  const todos = await Todo.find(filter);

  res
    .status(200)
    .json(new ApiResponse(200, 'Todo fetched successfully', todos));
});
