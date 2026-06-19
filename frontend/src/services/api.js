import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 30000,
  withCredentials: true,
});

// Attach token from localStorage on every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (err) => Promise.reject(err)
);

// Global 401 handler — clear token and redirect
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default api;






//The frontend uses a centralized Axios instance configured in api.js.
//A request interceptor automatically attaches the JWT token from localStorage 
//to the Authorization header of every request. A response interceptor
//globally handles 401 Unauthorized responses by clearing the token and 
//redirecting the user to the login page. Redux Toolkit manages
//authentication state, while authService acts as an abstraction
//layer between Redux thunks and Axios requests.