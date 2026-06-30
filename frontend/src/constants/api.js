
export const API = {
  AUTH: {
    LOGIN:    '/auth/login',    // POST  { email, password }
    REGISTER: '/auth/register', // POST  { fullName, username, email, password }
    ME:       '/auth/me',       // GET   → { message, user }
    LOGOUT:   '/auth/logout',   // POST  → clears cookies
  },
  INTERVIEW: {
    // POST multipart/form-data  fields: resume(file), selfDescription, jobDescription
    CREATE:  '/interview',
    // GET → { message, interviewReports[] }  (trimmed, no heavy fields)
    LIST:    '/interview',
    // GET /interview/:id → { message, interviewReport }  (full)
    BY_ID:   (id) => `/interview/${id}`,
    // POST /interview/:id/resume → PDF binary blob
    PDF:     (id) => `/interview/${id}/resume`,
  },
  PROFILE: {
    UPLOAD_AVATAR: "/profile/avatar",
    DELETE_AVATAR: "/profile/avatar",
    DELETE_ACCOUNT: "/profile",
},
};
