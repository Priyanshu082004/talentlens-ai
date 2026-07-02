import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCurrentUser } from '@redux/slices/authSlice.js';
import LoadingScreen from '@components/shared/LoadingScreen/LoadingScreen.jsx';
import { ROUTES } from '@constants/routes.js';


export default function ProtectedRoutes() {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading, user } = useSelector((s) => s.auth);

  useEffect(() => {
    // Only fetch if we don't yet have user data (first load / page refresh)
    if (!user && !isLoading) {
      dispatch(fetchCurrentUser());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // While verifying the cookie
  if (isLoading) return <LoadingScreen />;

  // Verified — user exists in Redux
  if (isAuthenticated) return <Outlet />;

  // Not authenticated
  return <Navigate to={ROUTES.LOGIN} replace />;
}


