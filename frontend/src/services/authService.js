
import api from './api';
import { API } from '@constants/api';

const authService = {
  login:    (credentials)  => api.post(API.AUTH.LOGIN,    credentials).then((r) => r.data),
  register: (userData)     => api.post(API.AUTH.REGISTER, userData).then((r) => r.data),
  me:       ()             => api.get(API.AUTH.ME).then((r) => r.data),
  logout:   ()             => api.post(API.AUTH.LOGOUT).then((r) => r.data),
};

export default authService;