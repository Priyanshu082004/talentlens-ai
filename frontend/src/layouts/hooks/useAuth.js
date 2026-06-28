import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser, logoutUser, clearError } from '@redux/slices/authSlice.js';
import { ROUTES } from '@constants/routes.js';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((s) => s.auth);

  const login = async (credentials) => {
    const result = await dispatch(loginUser(credentials));
    if (!result.error) navigate(ROUTES.DASHBOARD);
    return result;
  };

  const signup = async (userData) => {
    const result = await dispatch(registerUser(userData));
    if (!result.error) navigate(ROUTES.DASHBOARD);
    return result;
  };

  const logout = () => {
    dispatch(logoutUser());
    navigate(ROUTES.LOGIN);
  };

  const dismissError = () => dispatch(clearError());

  return { ...auth, login, signup, logout, dismissError };
};