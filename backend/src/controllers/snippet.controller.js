import { Snippet } from '../models/snippet.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';

export const createSnippet = asyncHandler(async (req, res, next) => {
  const userId = req.user?.id;

  if (!userId) {
    throw new ApiError(401, 'Unauthorized to create snippet!');
  }

  const { title, code, tags } = req.body;

  if (!title || !code || !Array.isArray(tags)) {
    throw new ApiError(
      400,
      'Title and code are required, tags must be an array.'
    );
  }

  if (!title.trim() || !code.trim()) {
    throw new ApiError(400, 'Title and code cannot be empty.');
  }

  const cleanTags = tags.map((tag) => tag.trim().toLowerCase()).filter(Boolean);

  const snippet = await Snippet.create({
    title: title.trim(),
    code: code.trim(),
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
