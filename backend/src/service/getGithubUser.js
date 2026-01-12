import client from "../utils/axios.js";
import ApiError from "../utils/ApiError.js";

export const getGithubUser = async (username) => {
  if (!username) {
    throw new ApiError(400, "GitHub username is required");
  }

  try {
    console.log(`[getGithubUser] Fetching user: ${username}`);
    const { data } = await client.get(`/users/${username}`);
    console.log(`[getGithubUser] Success: ${username}`);
    return data;
  } catch (err) {
    console.error(`[getGithubUser] Failed for ${username}:`, err.message);
    if (err.response) {
      const { status, data: body } = err.response;
      if (status === 404) {
        throw new ApiError(
          404,
          `GitHub user '${username}' not found. Check if the username is correct.`
        );
      } else if (status === 403) {
        throw new ApiError(
          403,
          "GitHub API rate limit exceeded. Please try again later."
        );
      }
      throw new ApiError(status, body.message || "GitHub API error");
    }
    throw new ApiError(500, err.message);
  }
};
