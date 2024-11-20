import axios from "axios";

// Create an instance of axios to use for API requests
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // Set a timeout for requests
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        // Unauthorized error
        console.error("Unauthorized. Redirecting to login...");
        window.location.href = "/login"; // Redirect to login
      } else if (status >= 500) {
        // Server errors
        console.error("Server Error:", error.response.data);
      }
    } else {
      console.error("Network/Unknown Error:", error.message);
    }
    return Promise.reject(error);
  }
);

// Generic Fetch Data Utility Function
const fetchData = async (method, url, data = null, params = null) => {
  try {
    const response = await apiClient({
      method,
      url,
      data,
      params, // Support for query parameters
    });

    return response.data;
  } catch (error) {
    console.error(`API Error (${method} ${url}):`, error.response || error.message);
    // Throw the response error or a generic message
    throw error.response?.data || { message: "An unexpected error occurred." };
  }
};

// Utility for setting base URL dynamically
export const setBaseURL = (url) => {
  apiClient.defaults.baseURL = url;
};

// Specific API Functions (Reusable)
export const getUserProfile = () => fetchData("GET", "/users/profile");
export const createUser = (userData) => fetchData("POST", "/users", userData);
export const updateUser = (userId, userData) =>
  fetchData("PUT", `/users/${userId}`, userData);
export const deleteUser = (userId) => fetchData("DELETE", `/users/${userId}`);

// Debugging Utility for Development
if (process.env.NODE_ENV === "development") {
  apiClient.interceptors.request.use((config) => {
    console.log("API Request:", config);
    return config;
  });
  apiClient.interceptors.response.use(
    (response) => {
      console.log("API Response:", response);
      return response;
    },
    (error) => {
      console.error("API Response Error:", error.response || error.message);
      return Promise.reject(error);
    }
  );
}

// Export fetchData properly
export { fetchData, apiClient };
