import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Upload, Trash2, RefreshCcw, Camera,} from "lucide-react";
import GlassCard from "@components/ui/GlassCard/GlassCard.jsx";
import Button from "@components/ui/Button/Button.jsx";
import { Toast } from "@components/ui/Toast/Toast.jsx";
import AvatarPreview from "@pages/Profile/sections/AvatarPreview.jsx";
import useAvatarUpload from "@hooks/useAvatarUpload.js";
import profileService from "@services/profileService.js";
import { updateUser } from "@redux/slices/authSlice.js";
export default function AvatarCard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const inputRef = useRef(null);
  const {
    preview,
    uploading,
    progress,
    selectImage,
    uploadImage,
    removePreview,
  } = useAvatarUpload();
  const handleSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    selectImage(file);
    const response = await uploadImage(file);
    if (response?.user) {
      dispatch(updateUser(response.user));
    }
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };
  const handleRemove = async () => {
    try {
      const response = await profileService.deleteAvatar();
      dispatch(updateUser(response.user));
      removePreview();
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      Toast.success("Avatar removed successfully.");
    }
    catch (error) {
      Toast.error(
        error?.response?.data?.message ||
        "Failed to remove avatar."
      );
    }
  };
  return (
    <GlassCard>
      <div className="flex flex-col items-center">
        <AvatarPreview
          avatar={preview || user?.avatar}
          fullName={user?.fullName}
        />
        <h2 className="mt-6 text-xl font-bold text-slate-900">
          {user?.fullName}
        </h2>
        <p className="text-slate-500 mt-1">
          @{user?.username}
        </p>
        <input
          ref={inputRef}
          hidden
          type="file"
          accept="image/*"
          onChange={handleSelect}
        />
        <div className="grid grid-cols-1 gap-3 mt-8 w-full">
          <Button
            loading={uploading}
            onClick={() => inputRef.current?.click()}
          >
            <Upload size={16} />
            Upload Photo
          </Button>
          <Button
            loading={uploading}
            variant="secondary"
            onClick={() => inputRef.current?.click()}
          >
            <RefreshCcw size={16} />
            Replace Photo
          </Button>
          <Button
            variant="ghost"
            onClick={handleRemove}
            className="text-red-400 hover:bg-red-500/10"
          >
            <Trash2 size={16} />
            Remove Photo
          </Button>
        </div>
        {uploading && (
          <div className="mt-5 w-full">
            <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-primary-500 transition-all"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
            <p className="mt-2 text-xs text-slate-500 text-center">
              Uploading... {progress}%
            </p>
          </div>
        )}
        <div className="mt-8 rounded-xl border border-primary-500/20 bg-primary-500/5 p-4 w-full">
          <div className="flex gap-3">
            <Camera className="text-primary-400 shrink-0 mt-1" size={18} />
            <p className="text-sm leading-7 text-slate-600">
              Supported formats:
              JPG, PNG and WEBP.
              <br />
              Maximum upload size:
              <strong className="text-slate-900">         
                {" "}5 MB
              </strong>
            </p>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}