export const API = {
  AUTH: {
    LOGIN:    '/auth/login',
    REGISTER: '/auth/register',
    ME:       '/auth/me',
    LOGOUT:   '/auth/logout',
  },
  RESUME: {
    ANALYZE: '/resume/analyze',
    HISTORY: '/resume/history',
    DELETE:  (id) => `/resume/${id}`,
  },
};