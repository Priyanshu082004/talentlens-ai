import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, FileText, History,
  User, Settings, ChevronLeft, ChevronRight, Zap, LogOut,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '@redux/slices/uiSlice.js';
import { useAuth } from '@hooks/useAuth.js';
import { ROUTES } from '@constants/routes.js';
import { sidebarVariants } from '@animations/framerVariants.js';
import clsx from 'clsx';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, path: ROUTES.DASHBOARD },
  { label: 'Analysis',  icon: FileText,        path: ROUTES.ANALYSIS },
  { label: 'History',   icon: History,         path: ROUTES.HISTORY },
  { label: 'Profile',   icon: User,            path: ROUTES.PROFILE },
  { label: 'Settings',  icon: Settings,        path: ROUTES.SETTINGS },
];

export default function Sidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { logout } = useAuth();
  const { sidebarCollapsed } = useSelector((s) => s.ui);
  // Backend returns fullName (not name)
  const { user } = useSelector((s) => s.auth);

  return (
    <motion.aside
      variants={sidebarVariants}
      animate={sidebarCollapsed ? 'collapsed' : 'expanded'}
      className="fixed left-0 top-0 h-screen bg-bg-surface border-r border-white/5 flex flex-col z-40 overflow-hidden"
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-white/5 shrink-0">
        <Link to={ROUTES.HOME} className="flex items-center gap-3 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-gradient-hero flex items-center justify-center shrink-0">
            <Zap size={16} className="text-white" />
          </div>
          {!sidebarCollapsed && (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-display font-bold text-white text-base whitespace-nowrap">
              ResumeAI
            </motion.span>
          )}
        </Link>
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-4 px-2 flex flex-col gap-1 overflow-y-auto">
        {NAV_ITEMS.map(({ label, icon: Icon, path }) => {
          const active = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative',
                active ? 'bg-primary-500/15 text-primary-400' : 'text-gray-500 hover:text-gray-200 hover:bg-white/5'
              )}
            >
              {active && (
                <motion.div layoutId="sidebar-active" className="absolute inset-0 rounded-xl bg-primary-500/10 border border-primary-500/20" />
              )}
              <Icon size={18} className="shrink-0 relative z-10" />
              {!sidebarCollapsed && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-medium whitespace-nowrap relative z-10">
                  {label}
                </motion.span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User + logout */}
      <div className="p-2 border-t border-white/5 flex flex-col gap-1">
        {user && (
          <div className={clsx('flex items-center gap-3 px-3 py-2 rounded-xl', !sidebarCollapsed && 'mb-1')}>
            <div className="w-8 h-8 rounded-full bg-gradient-hero flex items-center justify-center text-xs font-bold text-white shrink-0">
              {/* fullName from backend */}
              {user.fullName?.[0]?.toUpperCase() || user.username?.[0]?.toUpperCase() || 'U'}
            </div>
            {!sidebarCollapsed && (
              <div className="overflow-hidden">
                <p className="text-sm font-medium text-white truncate">{user.fullName}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            )}
          </div>
        )}

        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-500/5 transition-all w-full"
        >
          <LogOut size={18} className="shrink-0" />
          {!sidebarCollapsed && <span className="text-sm font-medium">Sign out</span>}
        </button>

        <button
          onClick={() => dispatch(toggleSidebar())}
          className="flex items-center justify-center w-full py-2 rounded-xl text-gray-600 hover:text-gray-300 hover:bg-white/5 transition-all"
        >
          {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
    </motion.aside>
  );
}
