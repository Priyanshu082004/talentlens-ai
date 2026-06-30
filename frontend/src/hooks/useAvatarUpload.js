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