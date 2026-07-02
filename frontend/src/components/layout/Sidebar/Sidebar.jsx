import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutDashboard, History, User, ChevronLeft, ChevronRight, Zap, LogOut} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "@redux/slices/uiSlice.js";
import { useAuth } from "@hooks/useAuth.js";
import { ROUTES } from "@constants/routes.js";
import { sidebarVariants } from "@animations/framerVariants.js";
import clsx from "clsx";

const NAV_ITEMS = [
   {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: ROUTES.DASHBOARD,
  },
  {
    label: "History",
    icon: History,
    path: ROUTES.HISTORY,
  },
  {
    label: "Profile",
    icon: User,
    path: ROUTES.PROFILE,
  },
];

export default function Sidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { logout } = useAuth();
  const { sidebarCollapsed } = useSelector((state) => state.ui);
  const { user } = useSelector((state) => state.auth);

  return (
    <motion.aside variants={sidebarVariants} animate={sidebarCollapsed ? "collapsed" : "expanded"}
      className=" fixed left-0 top-0 h-screen bg-white border-r border-slate-200/70 flex flex-col z-40 overflow-hidden shadow-card"
    >
      <div className="h-16 flex items-center px-4 border-b border-slate-200 shrink-0">
        <Link   to={ROUTES.HOME}
          className="flex items-center gap-3 overflow-hidden"  >
          <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center shrink-0 shadow-card">
            <Zap  size={16} className="text-white"  />
          </div>
          {!sidebarCollapsed && (
            <motion.span
              initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
              className="font-display font-bold text-slate-900 text-base whitespace-nowrap"
            >
              TalentLensAI
            </motion.span>
          )}
        </Link>
      </div>
      <nav className="flex-1 py-4 px-2 flex flex-col gap-1 overflow-y-auto">
        {NAV_ITEMS.map(({ label, icon: Icon, path }) => {
          const active = location.pathname === path;
          return (
            <Link  key={path} to={path}
               className={clsx(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                active
                  ? "bg-primary-500/15 text-primary-400"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              )}
            >
              {active && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl bg-primary-500/10 border border-primary-500/20"
                />
              )}
              <Icon size={18}
                className="relative z-10 shrink-0"
              />
              {!sidebarCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="relative z-10 text-sm font-medium whitespace-nowrap"
                >
                  {label}
                </motion.span>
              )}
            </Link>
          );
        })}
      </nav>
      <div className="p-2 border-t border-slate-200 flex flex-col gap-1">
        {user && (
          <div
            className={clsx(
              "flex items-center gap-3 px-3 py-2 rounded-xl",
              !sidebarCollapsed && "mb-1"
            )}   >
            <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
              {user.avatar ? (
                <img src={user.avatar} alt={user.fullName} className="w-full h-full object-cover" />) : (
                <div  className="
                    w-full
                    h-full
                    rounded-full
                    bg-gradient-hero
                    flex
                    items-center
                    justify-center
                    text-sm
                    font-bold
                    text-white
                    "
                >
                  {user.fullName?.[0]?.toUpperCase() ||
                    user.username?.[0]?.toUpperCase() ||
                    "U"}
                </div>
              )}
            </div>
            {!sidebarCollapsed && (
              <div className="overflow-hidden">
                <p className="text-sm font-medium text-slate-900 truncate">
                  {user.fullName}
                </p>
                <p className="text-xs text-slate-500 truncate">
                  {user.email}
                </p>
              </div>
            )}
          </div>
        )}
        <button
          onClick={logout}
          className="
            flex
            items-center
            gap-3
            px-3
            py-2.5
            rounded-xl
            text-slate-600
            hover:text-red-500
            hover:bg-red-50
            transition-all
            w-full
          "
        >
          <LogOut size={18}
            className="shrink-0"
          />
          {!sidebarCollapsed && (
            <span className="text-sm font-medium">
              Sign out
            </span>
          )}
        </button>
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="
            flex
            items-center
            justify-center
            w-full
            py-2
            rounded-xl
            text-slate-600
            hover:text-slate-900
            hover:bg-slate-100
            transition-all
          "
        >
          {sidebarCollapsed ? (
            <ChevronRight size={16} />
          ) : (
            <ChevronLeft size={16} />
          )}
        </button>
      </div>
    </motion.aside>
  );
}