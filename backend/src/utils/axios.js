import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

console.log('[GitHub API] Initializing with token:', process.env.GITHUB_TOKEN ? 'Present' : 'MISSING');

const client = axios.create({
  baseURL: 'https://api.github.com',
timeout: 10000,
  headers: { 
    Accept: 'application/vnd.github.v3+json',
  },
});

client.interceptors.request.use((cfg) => {
  const token = process.env.GITHUB_TOKEN;
  if (token) {
    cfg.headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn('[GitHub API] Warning: GITHUB_TOKEN not set. Rate limits will be lower.');
  }
  return cfg;
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(`[GitHub API] Error ${error.response.status}:`, error.response.data?.message);
    } else if (error.request) {
      console.error('[GitHub API] No response received:', error.message);
    } else {
      console.error('[GitHub API] Request error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default client;