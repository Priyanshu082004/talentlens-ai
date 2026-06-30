import { motion } from "framer-motion";
import { UserCircle2 } from "lucide-react";

export default function ProfileHeader() {
  return (
    <div className="flex items-center justify-between flex-wrap gap-4">
      <div className="flex items-center gap-4">
        <div
          className="
            w-12
            h-12
            rounded-2xl
            bg-gradient-hero
            flex
            items-center
            justify-center
          "
        >
          <UserCircle2
            size={24}
            className="text-white"
          />
        </div>
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl font-bold text-white"
          >
            My Profile
          </motion.h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage your avatar and account settings.
          </p>
        </div>
      </div>
    </div>
  );
}