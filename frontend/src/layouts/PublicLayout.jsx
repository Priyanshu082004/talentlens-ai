import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@components/layout/Navbar/Navbar.jsx';
import Footer from '@components/layout/Footer/Footer.jsx';
import { pageTransition } from '@animations/framerVariants.js';

export default function PublicLayout() {
  const location = useLocation();
  const isAuthPage = ['/login', '/signup'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-bg-base">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main key={location.pathname} {...pageTransition}>
          <Outlet />
        </motion.main>
      </AnimatePresence>
      {!isAuthPage && <Footer />}
    </div>
  );
}