import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@components/layout/Navbar/Navbar.jsx";
import Footer from "@components/layout/Footer/Footer.jsx";
import { pageTransition } from "@animations/framerVariants.js";

export default function PublicLayout() {
  const location = useLocation();

  const isAuthPage = ["/login", "/signup"].includes(location.pathname);

  return (
    <div
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#F8FAFC]
      "
    >
      {/* Subtle ambient background */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-100
        "
        style={{
          background: `
            radial-gradient(circle at top left, rgba(79,70,229,0.05), transparent 28%),
            radial-gradient(circle at bottom right, rgba(99,102,241,0.04), transparent 32%)
          `,
        }}
      />

      <div className="relative z-10">
        <Navbar />

        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            {...pageTransition}
            className="min-h-[calc(100vh-64px)]"
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>

        {!isAuthPage && <Footer />}
      </div>
    </div>
  );
}