import { Snippet } from '../models/snippet.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import mongoose from 'mongoose';

export const createSnippet = asyncHandler(async (req, res, next) => {
  const userId = req.user?.id;

  if (!userId) {
    throw new ApiError(401, 'Unauthorized to create snippet!');
  }

  const { title, code, tags, description, language, difficulty } = req.body;

  if (!title || !code || !language || !Array.isArray(tags)) {
    throw new ApiError(
      400,
      'Title and code are required, tags must be an array.'
    );
  }

  if (!title.trim() || !code.trim() || !language.trim()) {
    throw new ApiError(400, 'Title, code  and language cannot be empty.');
  }

  const cleanTags = tags.map((tag) => tag.trim().toLowerCase()).filter(Boolean);

  const snippet = await Snippet.create({
    title: title.trim(),
    code: code.trim(),
    description,
    language,
    difficulty: difficulty?.toLowerCase(),
    tags: cleanTags,
    userId,
  });

  if (!snippet) {
    throw new ApiError(500, 'Failed to create a code snippet!');
  }

  res
    .status(201)
    .json(new ApiResponse(201, 'Code snippet created successfully', snippet));
});

export const updateSnippet = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  const snippetId = req.params?.id;

  if (!userId) throw new ApiError(401, 'Unauthorized!');
  if (!mongoose.isValidObjectId(snippetId)) {
    throw new ApiError(400, 'Valid snippet ID is required');
  }

  const snippet = await Snippet.findById(snippetId);
  if (!snippet) throw new ApiError(404, 'Snippet not found!');
  if (snippet.userId.toString() !== userId) {
    throw new ApiError(403, 'You are not authorized to update this snippet');
  }

  const { title, code, tags, language, description, difficulty } = req.body;

  const updates = {};

  if (typeof title === 'string' && title.trim()) {
    updates.title = title.trim();
  }

  if (typeof code === 'string' && code.trim()) {
    updates.code = code.trim();
  }

  if (typeof language === 'string' && language.trim()) {
    updates.language = language.trim();
  }

  if (typeof description === 'string' && description.trim()) {
    updates.description = description.trim();
  }

  if (typeof difficulty === 'string' && difficulty.trim()) {
    updates.difficulty = difficulty.trim();
  }

  if (Array.isArray(tags)) {
    updates.tags = tags.map((tag) => tag.trim().toLowerCase()).filter(Boolean);
  }

  if (Object.keys(updates).length === 0) {
    throw new ApiError(400, 'No valid fields provided to update');
  }

  const updatedSnippet = await Snippet.findByIdAndUpdate(snippetId, updates, {
    new: true,
  });

  if (!updatedSnippet) throw new ApiError(500, 'Failed to update snippet');

  res
    .status(200)
    .json(new ApiResponse(200, 'Snippet updated successfully', updatedSnippet));
});

export const deleteSnippet = asyncHandler(async (req, res, next) => {
  const userId = req.user?.id;

  if (!userId) {
    throw new ApiError(
      401,
      'You are unauthorized to delete! Please login first'
    );
  }

  const snippetId = req.params?.id;

  if (!mongoose.isValidObjectId(snippetId)) {
    throw new ApiError(400, 'Valid snippet id is required');
  }

  const snippet = await Snippet.findById(snippetId);

  if (!snippet) {
    throw new ApiError(500, 'Snippet not found!');
  }

  if (snippet.userId.toString().trim() !== userId.trim()) {
    throw new ApiError(401, 'You are unauthorized to delete others snippet');
  }

  const deletedSnippet = await Snippet.findByIdAndDelete(snippetId);

  if (!deletedSnippet) {
    throw new ApiError(500, 'Error while deleting snippet');
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, 'Snippet deleted successfully!', deletedSnippet)
    );
});

export const getAllSnippet = asyncHandler(async (req, res, next) => {
  const userId = req.user?.id;

  if (!userId) {
    throw new ApiError(401, 'Error to fetched snippet');
  }

  const snippet = await Snippet.find({ userId });

  if (!snippet || snippet.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, 'No snippets found for this user', []));
  }

  res
    .status(200)
    .json(new ApiResponse(200, 'Snippet fetched successfully', snippet));
});

export const getSnippet = asyncHandler(async (req, res, next) => {
  const snippetId = req.params.id;
  const userId = req.user?.id;

  if (!userId) {
    throw new ApiError(401, 'Unauthorized!');
  }

  if (!snippetId) {
    throw new ApiError(400, 'Requires snippetId!');
  }

  const snippet = await Snippet.findById(snippetId);

  if (!snippet) {
    throw new ApiError(404, 'Snippet not found!');
  }

  if (snippet.userId.toString() !== userId) {
    throw new ApiError(401, 'You are not authorized to access the snippet');
  }

  res
    .status(200)
    .json(new ApiResponse(200, 'Successfully fetched snippet', snippet));
});
