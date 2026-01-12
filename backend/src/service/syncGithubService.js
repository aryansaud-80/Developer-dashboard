import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import { getActivity } from "./getActivity.js";
import { getGithubUser } from "./getGithubUser.js";
import { getRepo } from "./getRepo.js";
import { GithubProfile } from "../models/github.model.js";
import { computeLanguageData } from "./computeLanguageData.js";

export const syncGithubDataForUser = async (userId, githubUsername) => {
  if (!githubUsername) {
    throw new ApiError(400, "GitHub username is required");
  }

  console.log(`[GitHub Sync] Starting sync for user ${userId} with username ${githubUsername}`);

  try {
    console.log(`[GitHub Sync] Fetching GitHub data for ${githubUsername}...`);
    
    const [githubUser, githubRepos, githubActivity] = await Promise.all([
      getGithubUser(githubUsername),
      getRepo(githubUsername),
      getActivity(githubUsername),
    ]);

    console.log(`[GitHub Sync] Successfully fetched data for ${githubUsername}`);
    console.log(`[GitHub Sync] Repos: ${githubRepos.length}, Activities: ${githubActivity.length}`);

    const totalStars = githubRepos.reduce(
      (sum, repo) => sum + (repo.stargazers_count || 0),
      0
    );

    const profileData = {
      username: githubUser.login,
      name: githubUser.name || "",
      avatar_url: githubUser.avatar_url || "",
      bio: githubUser.bio || "",
      followers: githubUser.followers || 0,
      following: githubUser.following || 0,
      public_repos: githubUser.public_repos || 0,
      totalStars,
      created_at: githubUser.created_at,
      html_url: githubUser.html_url || "",
      repositories: githubRepos.map((repo) => ({
        id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        description: repo.description || "",
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
        repo: {
          name: act.repo.name,
          url: `https://github.com/${act.repo.name}`,
        },
        created_at: act.created_at,
        payload: act.payload,
      })),
      languages: computeLanguageData(githubRepos),
      userId,
    };

    console.log(`[GitHub Sync] Saving profile for userId ${userId}...`);
    
    // Query by userId instead of username to avoid conflicts when username changes
    const githubProfile = await GithubProfile.findOneAndUpdate(
      { userId: userId },
      profileData,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    console.log(`[GitHub Sync] Successfully saved profile. ID: ${githubProfile._id}`);
    return githubProfile;
  } catch (error) {
    console.error(`[GitHub Sync] Error syncing GitHub data:`, error.message);
    throw error;
  }
};