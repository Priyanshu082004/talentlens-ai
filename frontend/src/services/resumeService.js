import api from './api';
import { API } from '@constants/api';

const resumeService = {
  analyzeResume: (file, onProgress) => {
    const form = new FormData();
    form.append('resume', file);
    return api
      .post(API.RESUME.ANALYZE, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (e) => {
          const pct = e.total 
          ? Math.round((e.loaded * 100) / e.total) : 0;
          if (onProgress) onProgress(pct);
        },
      })
      .then((r) => r.data);
  },

  getHistory: () => api.get(API.RESUME.HISTORY).then((r) => r.data),

  deleteEntry: (id) => api.delete(API.RESUME.DELETE(id)).then((r) => r.data),
};

export default resumeService;