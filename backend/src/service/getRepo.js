import client from '../utils/axios.js';
import ApiError from '../utils/ApiError.js';

export const getRepo = async (username) => {
  if (!username) {
    throw new ApiError(400, 'GitHub username is required');
  }

  try {
    console.log(`[getRepo] Fetching repos for: ${username}`);
    const { data } = await client.get(`/users/${username}/repos`);
    console.log(`[getRepo] Found ${data.length} repos for ${username}`);
    return data;
  } catch (err) {
    console.error(`[getRepo] Failed for ${username}:`, err.message);
    if (err.response) {
      const { status, data: body } = err.response;
      if (status === 404) {
        throw new ApiError(404, `GitHub user '${username}' not found.`);
      } else if (status === 403) {
        throw new ApiError(403, 'GitHub API rate limit exceeded.');
      }
      throw new ApiError(status, body.message || 'GitHub API error');
    }
    throw new ApiError(500, err.message);
  }
};