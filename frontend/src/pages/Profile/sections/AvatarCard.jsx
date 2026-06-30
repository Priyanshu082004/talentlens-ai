import { useRef, useState } from "react";

import {Upload,Trash2,RefreshCcw,Camera,} from "lucide-react";
import GlassCard from "@components/ui/GlassCard/GlassCard.jsx";
import Button from "@components/ui/Button/Button.jsx";
import { Toast } from "@components/ui/Toast/Toast.jsx";
import AvatarPreview from "@pages/Profile/sections/AvatarPreview.jsx";

export default function AvatarCard({ user }) {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(user?.avatar || "");
  const handleSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      Toast.error("Please select an image.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      Toast.error("Maximum image size is 5 MB.");
      return;
    }
  const url = URL.createObjectURL(file);
 setPreview(url);
    Toast.success("Image selected.");
  };
  const handleRemove = () => {
    setPreview("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    Toast.success("Image removed.");
  };

  return (
    <GlassCard>
      <div className="flex flex-col items-center">
        <AvatarPreview
          avatar={preview}
          fullName={user?.fullName}
        />
        <h2 className="mt-6 text-xl font-bold text-white">
          {user?.fullName}
        </h2>
        <p className="text-gray-500 mt-1">
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
            onClick={() => inputRef.current?.click()}
          >
            <Upload size={16} />
            Upload Photo
          </Button>
          <Button
            variant="secondary"
            onClick={() => inputRef.current?.click()}
          >
            <RefreshCcw size={16} />
            Replace Photo
          </Button>
          <Button
            variant="ghost"
            onClick={handleRemove}
            className="
              text-red-400
              hover:bg-red-500/10
            "
          >
            <Trash2 size={16} />
            Remove Photo
          </Button>
        </div>
        <div
          className="
            mt-8
            rounded-xl
            border
            border-primary-500/20
            bg-primary-500/5
            p-4
            w-full
          "
        >
          <div className="flex gap-3">
            <Camera
              className="text-primary-400 shrink-0 mt-1"
              size={18}
            />
            <p className="text-sm leading-7 text-gray-400">
              Supported formats:
              JPG, PNG and WEBP.
              <br />
              Maximum upload size:
              <strong className="text-white">
                {" "}5 MB
              </strong>
            </p>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}