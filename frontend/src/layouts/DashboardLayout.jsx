import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import Sidebar from '@components/layout/Sidebar/Sidebar.jsx';
import { pageTransition } from '@animations/framerVariants.js';

export default function DashboardLayout() {
  const location = useLocation();
  const { sidebarCollapsed } = useSelector((s) => s.ui);
  const sidebarWidth = sidebarCollapsed ? 64 : 240;

  return (
    <div className="min-h-screen bg-bg-base flex">
      <Sidebar />

      <motion.div
        animate={{ marginLeft: sidebarWidth }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 min-h-screen"
      >
        <AnimatePresence mode="wait">
          <motion.main key={location.pathname} {...pageTransition} className="p-6 md:p-8 max-w-7xl">
            <Outlet />
          </motion.main>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
