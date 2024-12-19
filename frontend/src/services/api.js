import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3001/api", // Ensure /api is the default base URL
  withCredentials: true, // Ensures cookies are sent with every request
});

// Add token to every request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Function to fetch photos
export const getPhotos = async () => {
  try {
    const response = await api.get("/photos"); // Already prefixed with /api from baseURL
    return response.data;
  } catch (error) {
    console.error("Error fetching photos:", error);
    throw error;
  }
};

// Function to fetch projects
export const getProjects = async () => {
  try {
    const response = await api.get("/projects"); // Already prefixed with /api from baseURL
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

export default api;
