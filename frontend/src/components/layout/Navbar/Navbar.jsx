import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useAuth } from '@hooks/useAuth.js';
import Button from '@components/ui/Button/Button.jsx';
import { ROUTES } from '@constants/routes.js';



//  seperate configuration for nav links to make it easier to add/remove links in the future
const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'FAQ', href: '#faq' },
];       

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated } = useSelector((s) => s.auth);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass border-b border-slate-200/70' : 'bg-white/75 backdrop-blur-xl'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to={ROUTES.HOME} className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center shadow-card">
            <Zap size={16} className="text-white" />
          </div>
          <span className="font-display font-bold text-slate-900 text-lg">TalentLensAI</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href} className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate(ROUTES.DASHBOARD)}>Dashboard</Button>
              <Button variant="secondary" size="sm" onClick={logout}>Sign out</Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate(ROUTES.LOGIN)}>Log in</Button>
              <Button size="sm" onClick={() => navigate(ROUTES.SIGNUP)}>Get started free</Button>
            </>
          )}
        </div>

        <button className="md:hidden text-slate-600 hover:text-slate-900" onClick={() => setMobileOpen((p) => !p)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-slate-200 px-6 py-4 flex flex-col gap-4"
          >
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} className="text-sm text-slate-700 py-1" onClick={() => setMobileOpen(false)}>
                {l.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-2 border-t border-slate-200">
              {isAuthenticated ? (
                <Button fullWidth onClick={() => { navigate(ROUTES.DASHBOARD); setMobileOpen(false); }}>
                  Go to Dashboard
                </Button>
              ) : (
                <>
                  <Button variant="ghost" fullWidth onClick={() => { navigate(ROUTES.LOGIN); setMobileOpen(false); }}>
                    Log in
                  </Button>
                  <Button fullWidth onClick={() => { navigate(ROUTES.SIGNUP); setMobileOpen(false); }}>
                    Get started free
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}