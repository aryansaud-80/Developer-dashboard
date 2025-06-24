import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const client = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 5000,
  headers: { Accept: 'application/vnd.github.v3+json' },
});


client.interceptors.request.use((cfg) => {
  cfg.headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return cfg;
});

export default client;
