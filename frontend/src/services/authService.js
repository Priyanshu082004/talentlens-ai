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