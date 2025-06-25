import { User } from '../models/user.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import jwt from 'jsonwebtoken';
import { option } from '../constant.js';

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

export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if ([email, password].some((field) => field.trim() === '')) {
    throw new ApiError(400, 'Email and password are required!');
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(500, 'Failed to find User. Invalid email!');
  }

  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    throw new ApiError(401, 'Invalid password. Try again!');
  }

  const { accessToken, refreshToken } = await generateToken(user._id);

  const loggedInUser = await User.findById(user._id).select(
    '-password -refreshToken'
  );

  res
    .status(200)
    .cookie('refreshToken', refreshToken, option)
    .json(
      new ApiResponse(200, 'User loggedIn Successfully', {
        user: loggedInUser,
        accessToken,
      })
    );
});

export const getUser = asyncHandler(async (req, res, next) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(401, 'Unauthorized');
  }

  const user = await User.findById(userId).select('-password -refreshToken');

  if (!user) {
    throw new ApiError(500, 'User not found!');
  }

  res.status(200).json(new ApiResponse(200, 'User found successfully', user));
});

export const refresh = asyncHandler(async (req, res, next) => {
  const Token = req.cookies.refreshToken;

  if (!Token) {
    throw new ApiError(400, 'Refresh Token is empty!');
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(Token, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    throw new ApiError(401, 'Invalid or expired refresh token');
  }

  const user = await User.findById(decodedToken._id || decodedToken.id);

  if (!user) {
    throw new ApiError(400, 'User not found!');
  }

  const { accessToken, refreshToken } = await generateToken(user._id);

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  res
    .status(200)
    .cookie('refreshToken', refreshToken, option)
    .json(
      new ApiResponse(200, 'Token refreshed Successfully', { accessToken })
    );
});

// TODO: NEED TO CREATE UPDATE USER AND LOGOUT USER AND DELETE USER ROUTE
