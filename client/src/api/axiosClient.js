import axios from "axios";
import toast from "react-hot-toast";

// Create axios instance with base configuration
const axiosClient = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "https://civicsense-khaq.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - Add JWT token to requests
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // If data is FormData, remove Content-Type header to let browser set it with boundary
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors and auto-logout on 401
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Only auto-logout on 401 if it's an authentication error (not a business logic error)
    // Business logic 401s (like "login required for this category") should not log out the user
    if (error.response?.status === 401) {
      const errorMessage = error.response?.data?.message || "";

      // Check if it's an authentication error (token-related) vs business logic error
      const isAuthError =
        errorMessage.includes("token") ||
        errorMessage.includes("Token") ||
        errorMessage.includes("Authorization denied") ||
        errorMessage.includes("not valid") ||
        errorMessage.includes("expired");

      // Only logout if it's a real authentication error, not a business logic requirement
      if (isAuthError) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("userType");

        // Only show toast if not already on login page
        if (!window.location.pathname.includes("/login")) {
          toast.error("Session expired. Please login again.");
          window.location.href = "/";
        }
      }
      // For business logic 401s, just show the error message without logging out
    }

    // Handle other errors
    if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    } else if (error.message) {
      toast.error(error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
