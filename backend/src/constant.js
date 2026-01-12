export const DB_NAME = "DevBoard";

export const option = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 30 * 24 * 60 * 60 * 1000,
};

// export const option = {
//   httpOnly: true,
//   secure: true, // ← REQUIRED for HTTPS tunnels
//   sameSite: "lax", // or 'none' if cross-site needed (but then MUST use secure)
//   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//   path: "/api/users/auth/refresh",
// };
