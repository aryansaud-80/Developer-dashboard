import { User } from '../models/user.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';

//TODO: NEED TO COMPLETE ALL CONTROLLERS

const generateToken = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });
  return { accessToken, refreshToken };
};

export const register = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  if ([username, email, password].some((field) => field.trim() === '')) {
    throw new ApiError(400, 'Requires all field');
  }

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    throw new ApiError(400, 'username or email already exist!');
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  if (!user) {
    throw new ApiError(500, 'Failed to register user!');
  }

  const registeredUser = await User.findById(user._id).select(
    '-password -refreshToken'
  );

  res
    .status(200)
    .json(new ApiResponse(200, 'User registered successfully', registeredUser));
});

export const loginUser = asyncHandler(async (req, res, next) => {});
