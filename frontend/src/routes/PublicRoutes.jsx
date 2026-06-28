import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROUTES } from '@constants/routes.js';

/**
 * Guards routes that should NOT be visible to an already-authenticated
 * user (login/signup). If logged in, redirect straight to dashboard.
 */
export default function PublicRoutes() {
  const { isAuthenticated } = useSelector((s) => s.auth);
  if (isAuthenticated) return <Navigate to={ROUTES.DASHBOARD} replace />;
  return <Outlet />;
}