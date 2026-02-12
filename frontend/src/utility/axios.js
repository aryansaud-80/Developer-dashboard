import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:4001/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue = [];
let onUnauthenticated = null;

export const setUnauthenticatedHandler = (handler) => {
  onUnauthenticated = handler;
};

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

const handleUnauthenticated = () => {
  localStorage.removeItem("accessToken");
  delete axiosInstance.defaults.headers.common.Authorization;
  if (typeof onUnauthenticated === "function") {
    onUnauthenticated();
  }
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const isAuthRoute =
      originalRequest?.url?.includes("/users/auth/refresh") ||
      originalRequest?.url?.includes("/users/auth/login") ||
      originalRequest?.url?.includes("/users/auth/register");

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthRoute
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch(Promise.reject);
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        console.log("Attempting to refresh token...");
        const { data } = await axiosInstance.post("/users/auth/refresh");
        const newToken = data?.data?.accessToken;

        if (newToken) {
          console.log("Token refreshed successfully");
          localStorage.setItem("accessToken", newToken);
          axiosInstance.defaults.headers.common.Authorization = `Bearer ${newToken}`;
          processQueue(null, newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        } else {
          console.warn("No access token in refresh response");
          handleUnauthenticated();
          return Promise.reject(error);
        }
      } catch (refreshErr) {
        console.error("Token refresh failed:", refreshErr.message);
        processQueue(refreshErr, null);
        handleUnauthenticated();
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
