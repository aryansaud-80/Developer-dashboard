import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { GithubProfile } from "../models/github.model.js";
import { syncGithubDataForUser } from "../service/syncGithubService.js";

export const fetchAndSaveGithubActivity = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  if (!userId) throw new ApiError(401, "Unauthorized");

  const user = await User.findById(userId);
  if (!user?.githubUsername) {
    throw new ApiError(400, "GitHub username not set for this user");
  }

  const githubProfile = await syncGithubDataForUser(
    userId,
    user.githubUsername
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, "GitHub profile saved successfully", githubProfile)
    );
});

export const getGithubData = asyncHandler(async (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    throw new ApiError(401, "You are unauthorized! Please login first");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(400, "User not found");
  }

  if (!user.githubUsername || user.githubUsername.trim() === "") {
    throw new ApiError(
      400,
      "GitHub username is not linked with the logged-in user"
    );
  }

  // Try to get existing GitHub data by userId (not username)
  let githubData = await GithubProfile.findOne({
    userId: userId,
  });

  // If no data found, try to sync it first
  if (!githubData) {
    try {
      githubData = await syncGithubDataForUser(userId, user.githubUsername);
    } catch (error) {
      throw new ApiError(
        404,
        "GitHub data not found. Please ensure your GitHub username is correct and your profile is public."
      );
    }
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Github data fetched successfully", githubData));
});
