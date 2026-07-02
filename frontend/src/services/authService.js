import api from "./api.js";
import { API } from "@constants/api.js";

const authService = {
  async login(credentials) {
    const { data } = await api.post(API.AUTH.LOGIN, credentials);
    return data;
  },

  async register(userData) {
    const { data } = await api.post(API.AUTH.REGISTER, userData);
    return data;
  },

  async me() {
    const { data } = await api.get(API.AUTH.ME);
    return data;
  },

  async logout() {
    const { data } = await api.post(API.AUTH.LOGOUT);
    return data;
  },
};

export default authService;
// // This code defines an `authService` object that provides methods for handling user authentication in a web application.
//  It uses an Axios instance (`api`) to make HTTP requests to the backend API endpoints defined in the `API` constant. 
// The service includes methods for logging in, registering a new user, fetching the current user's information, and logging out. 
// Each method returns the response data from the corresponding API call, allowing other parts of the application to interact with the authentication system easily.