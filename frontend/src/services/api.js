import axios from 'axios';


const api = axios.create({
  baseURL:         import.meta.env.VITE_API_URL || '/api',
  timeout:         60000,  // 60s — AI analysis can take time
  withCredentials: true,   // CRITICAL: sends cookies cross-origin
});

// Response interceptor: on 401 redirect to login
// (token blacklisted or expired — no silent refresh, backend has no refresh endpoint)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      // Only redirect if not already on an auth page
      if (!window.location.pathname.startsWith('/login') &&
          !window.location.pathname.startsWith('/signup')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(err);
  }
);

export default api;


// This code sets up an Axios instance for making HTTP requests to a backend API. 
// It configures the base URL, request timeout, and enables sending cookies with cross-origin requests. Additionally,
//  it includes a response interceptor that checks for 401 Unauthorized responses and redirects the user to the login page
//  if they are not already on an authentication page. This ensures that users are prompted to log in again if
//  their session has expired or their token has been invalidated.