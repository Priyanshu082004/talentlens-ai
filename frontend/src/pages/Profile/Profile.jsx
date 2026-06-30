import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import ProfileHeader from "@pages/Profile/sections/ProfileHeader.jsx";
import AvatarCard from "@pages/Profile/sections/AvatarCard.jsx";
import AccountInfoCard from "@pages/Profile/sections/AccountInfoCard.jsx";
import DangerZone from "@pages/Profile/sections/DangerZone.jsx";
import {staggerContainer,staggerItem,} from "@animations/framerVariants.js";
import styles from "./Profile.module.css";

export default function Profile() {
  const { user } = useSelector((state) => state.auth);
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className={`${styles.profile} w-full max-w-7xl mx-auto space-y-8`}
    >
      <motion.div variants={staggerItem}>
        <ProfileHeader />
      </motion.div>
      <motion.div
        variants={staggerItem}
        className="grid lg:grid-cols-3 gap-6"
      >
        <AvatarCard user={user} />

        <div className="lg:col-span-2">
          <AccountInfoCard user={user} />
        </div>
      </motion.div>

      <motion.div variants={staggerItem}>
        <DangerZone />
      </motion.div>
    </motion.div>
  );
}