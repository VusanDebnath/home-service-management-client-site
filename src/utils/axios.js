import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
// .env থেকে URL নাও

const axiosPublic = axios.create({
  baseURL: BASE_URL,
});

const axiosSecure = axios.create({
  baseURL: BASE_URL,
});

// Request interceptor — token auto attach
axiosSecure.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor — 401 handle
axiosSecure.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("auth-storage");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export { axiosPublic, axiosSecure };
