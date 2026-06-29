import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  loginUser,
  registerUser,
  logoutUser,
  clearError,
} from '@redux/slices/authSlice.js';
import { ROUTES } from '@constants/routes.js';


export const useAuth = () => {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const auth = useSelector((s) => s.auth);

  const login = async (credentials) => {
    const result = await dispatch(loginUser(credentials));
    if (!result.error) {
      toast.success('Welcome back!');
      navigate(ROUTES.DASHBOARD);
    } else {
      toast.error(result.payload || 'Login failed.');
    }
    return result;
  };

  const signup = async (userData) => {
    const result = await dispatch(registerUser(userData));
    if (!result.error) {
      toast.success('Account created successfully!');
      navigate(ROUTES.DASHBOARD);
    } else {
      toast.error(result.payload || 'Registration failed.');
    }
    return result;
  };

  const logout = async () => {
    await dispatch(logoutUser());
    toast.success('Logged out');
    navigate(ROUTES.LOGIN);
  };

  const dismissError = () => dispatch(clearError());

  return { ...auth, login, signup, logout, dismissError };
};
