import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { option } from "../constant.js";
import { GithubProfile } from "../models/github.model.js";
import { syncGithubDataForUser } from "../service/syncGithubService.js";

const generateToken = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });
  return { accessToken, refreshToken };
};

export const register = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  if ([username, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    throw new ApiError(400, "Username or email already exists!");
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  if (!user) {
    throw new ApiError(500, "Failed to register user!");
  }

  const registeredUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  res
    .status(201)
    .json(new ApiResponse(201, "User registered successfully", registeredUser));
});

export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if ([email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "Email and password are required!");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(401, "Invalid email or password!");
  }

  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    throw new ApiError(401, "Invalid email or password!");
  }

  const { accessToken, refreshToken } = await generateToken(user._id);

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  res
    .status(200)
    .cookie("refreshToken", refreshToken, option)
    .json(
      new ApiResponse(200, "User logged in successfully", {
        user: loggedInUser,
        accessToken,
      })
    );
});

export const getUser = asyncHandler(async (req, res, next) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }

  const user = await User.findById(userId).select("-password -refreshToken");

  if (!user) {
    throw new ApiError(500, "User not found!");
  }

  res.status(200).json(new ApiResponse(200, "User found successfully", user));
});

export const refresh = asyncHandler(async (req, res, next) => {
  const Token = req.cookies.refreshToken;

  if (!Token) {
    throw new ApiError(401, "Refresh token not found");
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(Token, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    throw new ApiError(401, "Invalid or expired refresh token");
  }

  const user = await User.findById(decodedToken.id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Verify the refresh token matches
  if (user.refreshToken !== Token) {
    throw new ApiError(401, "Invalid refresh token");
  }

  const { accessToken, refreshToken } = await generateToken(user._id);

  res
    .status(200)
    .cookie("refreshToken", refreshToken, option)
    .json(
      new ApiResponse(200, "Token refreshed successfully", { accessToken })
    );
});

export const logoutUser = asyncHandler(async (req, res, next) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }

  await User.findByIdAndUpdate(
    userId,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  res
    .status(200)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, "User logged out successfully", {}));
});

export const updateUser = asyncHandler(async (req, res, next) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }

  const { username, email, githubUsername } = req.body;

  const updates = {};

  if (username) {
    const existingUser = await User.findOne({
      username,
      _id: { $ne: userId },
    });
    if (existingUser) {
      throw new ApiError(400, "Username already exists!");
    }
    updates.username = username;
  }

  if (email) {
    const existingUser = await User.findOne({
      email,
      _id: { $ne: userId },
    });
    if (existingUser) {
      throw new ApiError(400, "Email already exists!");
    }
    updates.email = email;
  }


    // In the updateUser function, replace the GitHub sync section

  // Handle GitHub username update
  if (githubUsername !== undefined) {
    const currentUser = await User.findById(userId);
    const oldGithubUsername = currentUser.githubUsername;

    console.log(`[updateUser] GitHub username change: ${oldGithubUsername} -> ${githubUsername}`);

    // If GitHub username is being changed
    if (oldGithubUsername !== githubUsername) {
      // Update the username in the updates object
      updates.githubUsername = githubUsername && githubUsername.trim() ? githubUsername.trim() : null;

      // If new GitHub username is provided and not empty, sync it
      if (githubUsername && githubUsername.trim() !== "") {
        console.log(`[updateUser] Scheduling GitHub sync for user ${userId}`);
        // Start syncing in background without awaiting
        setImmediate(async () => {
          try {
            console.log(`[updateUser] Starting GitHub sync...`);
            await syncGithubDataForUser(userId, githubUsername.trim());
            console.log(`[updateUser] GitHub sync completed successfully`);
          } catch (error) {
            console.error(`[updateUser] GitHub sync failed:`, error.message);
          }
        });
      }
    }
  }

  const updatedUser = await User.findByIdAndUpdate(userId, updates, {
    new: true,
  }).select("-password -refreshToken");

  if (!updatedUser) {
    throw new ApiError(500, "Failed to update user!");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "User updated successfully", updatedUser));
});

export const deleteUser = asyncHandler(async (req, res, next) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }

  const user = await User.findByIdAndDelete(userId);

  if (!user) {
    throw new ApiError(404, "User not found!");
  }

  // Delete associated GitHub profile data
  await GithubProfile.deleteOne({ userId: userId });

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  res
    .status(200)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, "User account deleted successfully", {}));
});
