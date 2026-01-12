import { Todo } from "../models/todo.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

export const createTodo = asyncHandler(async (req, res, next) => {
  const { title, description, dueDate } = req.body;

  const userId = req.user?.id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized to create a todo!");
  }

  if ([title, description, dueDate].some((field) => field?.trim() === "")) {
    throw new ApiError(
      400,
      "All fields (title, description, due date, and priority) are required."
    );
  }

  // Compare only dates, not times - allow today and future dates
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const selectedDate = new Date(dueDate);
  selectedDate.setHours(0, 0, 0, 0);

  if (selectedDate < today) {
    throw new ApiError(400, "Due date cannot be before today's date");
  }

  const todo = await Todo.create({
    title,
    description,
    dueDate: new Date(dueDate),
    userId,
  });

  if (!todo) {
    throw new ApiError(500, "Failed to create a todo!");
  }

  res.status(201).json(new ApiResponse(201, "Todo created successfully", todo));
});

export const updateTodo = asyncHandler(async (req, res, next) => {
  const todoId = req.params.id;
  const userId = req.user?.id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized!");
  }

  if (!todoId) {
    throw new ApiError(400, "Todo id is required!");
  }

  const todo = await Todo.findById(todoId);
  const { title, description, dueDate } = req.body;

  if (!todo) {
    throw new ApiError(404, "Failed to find todo!");
  }

  if (todo.userId.toString() !== userId) {
    throw new ApiError(403, "You are not authorized to modify this todo.");
  }

  if ([title, description, dueDate].some((field) => field.trim() === "")) {
    throw new ApiError(400, "All field are required");
  }

  // Compare only dates, not times - allow today and future dates
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const selectedDate = new Date(dueDate);
  selectedDate.setHours(0, 0, 0, 0);

  if (selectedDate < today) {
    throw new ApiError(400, "Due date cannot be before today's date");
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
    throw new ApiError(500, "Failed to update todo!");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Todo updated successfully", updatedTodo));
});

export const deleteTodo = asyncHandler(async (req, res, next) => {
  const todoId = req.params.id;
  const userId = req.user?.id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized!");
  }

  if (!todoId) {
    throw new ApiError(400, "todoId is required to delete todo!");
  }

  const todo = await Todo.findById(todoId);

  if (!todo) {
    throw new ApiError(500, "Failed to find todo!");
  }

  if (todo.userId.toString() !== userId) {
    throw new ApiError(403, "You are not authorized to modify this todo.");
  }

  const deletedTodo = await Todo.findByIdAndDelete(todoId);

  if (!deletedTodo) {
    throw new ApiError(404, "Failed to delete todo!");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Todo deleted successfully", deletedTodo));
});

export const updateStatus = asyncHandler(async (req, res, next) => {
  const todoId = req.params.id;
  const userId = req.user?.id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized!");
  }

  if (!todoId) {
    throw new ApiError(400, "todoId is required!");
  }

  const todo = await Todo.findById(todoId);

  if (!todo) {
    throw new ApiError(400, "Failed to find todo!");
  }

  if (todo.userId.toString() !== userId) {
    throw new ApiError(403, "You are not authorized to modify this todo.");
  }

  const { completed } = req.body;

  if (typeof completed !== "boolean") {
    throw new ApiError(400, 'A boolean "completed" value is required!');
  }

  const updatedTodo = await Todo.findByIdAndUpdate(
    todoId,
    {
      completed: completed,
    },
    {
      new: true,
    }
  );

  if (!updatedTodo) {
    throw new ApiError(500, "Failed to update todo!");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Todo status updated!", updatedTodo));
});

export const getTodo = asyncHandler(async (req, res, next) => {
  const todoId = req.params.id;
  const userId = req.user?.id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized!");
  }

  if (!todoId) {
    throw new ApiError(400, "todoId is required!");
  }

  const todo = await Todo.findById(todoId);

  if (!todo) {
    throw new ApiError(404, "Todo not found!");
  }

  if (todo.userId.toString() !== userId) {
    throw new ApiError(403, "You are not authorized to view this todo.");
  }

  res.status(200).json(new ApiResponse(200, "Todo fetched!", todo));
});



export const getTodosByUserId = asyncHandler(async (req, res, next) => {
  const userId = req.user?.id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized!");
  }

  const todos = await Todo.find({ userId }).sort({ createdAt: -1 });

  res
    .status(200)
    .json(new ApiResponse(200, "All todos fetched successfully!", todos));
});
