// import { User } from "lucide-react";

export default function AvatarPreview({ avatar, fullName }) {
  if (avatar) {
    return (
      <img
        src={avatar}
        alt={fullName}
        className="
          w-40
          h-40
          rounded-full
          object-cover
          border-4
          border-primary-500/20
          shadow-xl
        "
      />
    );
  }
  const initials =
    fullName
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "U";
  return (
    <div
      className="
        w-40
        h-40
        rounded-full
        bg-gradient-hero
        flex
        items-center
        justify-center
        border-4
        border-primary-500/20
        shadow-xl
      "
    >
      <span className="text-4xl font-bold text-white">
        {initials}
      </span>
    </div>
  );
}