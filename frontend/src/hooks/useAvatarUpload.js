import { useState } from "react";
import profileService from "@services/profileService.js";
import { Toast } from "@components/ui/Toast/Toast.jsx";
export default function useAvatarUpload() {
    const [preview, setPreview] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const validate = (file) => {
        if (!file) return false;
        if (!file.type.startsWith("image/")) {
            Toast.error("Only image files are allowed.");
            return false;
        }
        if (file.size > 5 * 1024 * 1024) {
            Toast.error("Maximum image size is 5MB.");
            return false;
        }
        return true;
    };
    const selectImage = (file) => {
        if (!validate(file)) return;
        const objectURL = URL.createObjectURL(file);
        setPreview(objectURL);
        return objectURL;
    };
    const uploadImage = async (file) => {
        if (!validate(file)) return null;
        setUploading(true);
        setProgress(0);
        try {
            const response =
                await profileService.uploadAvatar(
                    file,
                    setProgress
                );
            Toast.success("Avatar updated successfully.");
            return response;
        }
        catch (error) {
            Toast.error(
                error?.response?.data?.message ||
                "Avatar upload failed."
            );
            return null;
        }
        finally {
            setUploading(false);
        }
    };
    const removePreview = () => {
        setPreview(null);
    };
    return {
        preview,
        uploading,
        progress,
        selectImage,
        uploadImage,
        removePreview,
    };
}


// This code defines a custom React hook called `useAvatarUpload` 
// that provides functionality for uploading and managing user avatar images. It includes state management 
// for the image preview, upload progress, and uploading status. The hook validates the selected image file 
// to ensure it is an image and within the size limit, provides a method to select and preview the image, and
//  handles the upload process with progress tracking. It also includes error handling and displays success or 
// error messages using a Toast component. The hook returns relevant state and functions for use in components.