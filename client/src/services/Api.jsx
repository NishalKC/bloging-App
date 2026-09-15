import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    if (error.response) {
      console.log(
        `API Error ${error.response.status}:`,
        error.response.data?.message
      );
    } else if (error.request) {
      console.log("Server is not responding");
    } else {
      console.log("Request error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default api;