import asyncHandler from '../utils/asyncHandler.js';
import { User } from '../models/user.model.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import { getActivity } from '../service/getActivity.js';
import { getGithubUser } from '../service/getGithubUser.js';
import { getRepo } from '../service/getRepo.js';
import { GithubProfile } from '../models/github.model.js';
import { computeLanguageData } from '../service/computeLanguageData.js';

export const fetchAndSaveGithubActivity = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  if (!userId) throw new ApiError(401, 'Unauthorized');

  const user = await User.findById(userId);
  if (!user?.githubUsername) {
    throw new ApiError(400, 'GitHub username not set for this user');
  }
  const githubUsername = user.githubUsername;

  const [githubUser, githubRepos, githubActivity] = await Promise.all([
    getGithubUser(githubUsername),
    getRepo(githubUsername),
    getActivity(githubUsername),
  ]);

  const totalStars = githubRepos.reduce(
    (sum, repo) => sum + (repo.stargazers_count || 0),
    0
  );

  const profileData = {
    username: githubUser.login,
    name: githubUser.name || '',
    avatar_url: githubUser.avatar_url || '',
    bio: githubUser.bio || '',
    followers: githubUser.followers || 0,
    following: githubUser.following || 0,
    public_repos: githubUser.public_repos || 0,
    totalStars,
    created_at: githubUser.created_at,
    html_url: githubUser.html_url || '',
    repositories: githubRepos.map((repo) => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description || '',
      html_url: repo.html_url,
      created_at: repo.created_at,
      updated_at: repo.updated_at,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      language: repo.language,
      topics: repo.topics || [],
    })),
    recentActivities: githubActivity.map((act) => ({
      id: act.id,
      type: act.type,
      repo: { name: act.repoName, url: `https://github.com/${act.repoName}` },
      created_at: act.createdAt,
    })),
    languages: computeLanguageData(githubRepos),
    userId,
  };

  const githubProfile = await GithubProfile.findOneAndUpdate(
    { username: githubUser.login },
    profileData,
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, 'GitHub profile saved successfully', githubProfile)
    );
});
