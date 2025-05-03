import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // use .env to manage environments
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true, // optional: for sending cookies, sessions, etc.
});
// Add request interceptor to attach JWT token
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    // If a token is available, add it to the Authorization header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  
    return config;
  }, (error) => {
    return Promise.reject(error);
  });
export default axiosInstance;