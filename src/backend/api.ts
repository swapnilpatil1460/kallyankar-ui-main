import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

const baseURL = "https://kallyankar-api-service.onrender.com/"; // Your API base URL
//"http://localhost:3001/"; //
// Create Axios instance with base URL
const api: AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 50000, // Adjust timeout as per your requirement
});

api.interceptors.request.use((config) => {
  const user = localStorage.getItem("candidate");
  if (user) {
    const { token } = JSON.parse(user);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Axios interceptor to handle errors globally
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error("API Error Status:", error.response.status);
      console.error("API Error Data:", error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("API Error Request:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("API Error Message:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
