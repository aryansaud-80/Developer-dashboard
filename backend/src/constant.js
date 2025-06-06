export const DB_NAME = 'DevBoard';

export const option = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  path: '/api/users/auth/refresh',
  maxAge: 30 * 24 * 60 * 60 * 1000,
};
