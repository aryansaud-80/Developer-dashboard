import client from '../utils/axios.js';
import ApiError from '../utils/ApiError.js';

export const getRepo = async (username) => {
  if (!username) {
    throw new ApiError(400, 'GitHub username is required');
  }

  try {
    const { data } = await client.get(`/users/${username}/repos`);
    return data;
  } catch (err) {
    if (err.response) {
      const { status, data: body } = err.response;
      throw new ApiError(status, body.message || 'GitHub API error');
    }
    throw new ApiError(500, err.message);
  }
};


