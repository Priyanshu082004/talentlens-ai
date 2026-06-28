import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROUTES } from '@constants/routes.js';

/**
 * Guards routes that require authentication (dashboard and children).
 * If not logged in, redirect to login.
 */
export default function ProtectedRoutes() {
  const { isAuthenticated, token } = useSelector((s) => s.auth);
  if (!isAuthenticated && !token) return <Navigate to={ROUTES.LOGIN} replace />;
  return <Outlet />;
}
