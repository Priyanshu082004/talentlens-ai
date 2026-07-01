import api from "@services/api.js";
import { API } from "@constants/api.js";

const profileService = {
  async getProfile() {
    const { data } = await api.get(API.PROFILE.GET);
    return data;
  },

  async uploadAvatar(file, onUploadProgress) {
    const formData = new FormData();
    formData.append("avatar", file);
    const { data } = await api.post(API.PROFILE.UPLOAD_AVATAR,formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (event) => {
          if (!event.total) return;
          const progress = Math.round(
            (event.loaded * 100) / event.total
          );
          onUploadProgress?.(progress);
        },
      }
    );
    return data;
  },

  async deleteAvatar() {
    const { data } = await api.delete( API.PROFILE.DELETE_AVATAR );
    return data;
  },

  async deleteAccount() {
    const { data } = await api.delete(API.PROFILE.DELETE_ACCOUNT   );
    return data;
  },
};

export default profileService;