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


// This code defines a `profileService` object that provides methods for managing user profile-related operations in a web application. 
// It uses an Axios instance (`api`) to make HTTP requests to the backend API endpoints defined in the `API` constant. 
// The service includes methods for retrieving the user's profile, uploading an avatar image with progress tracking, deleting the avatar,
//  and deleting the user account. Each method returns the response data from the corresponding API call, allowing other parts of the 
// application to interact with the user profile system easily.