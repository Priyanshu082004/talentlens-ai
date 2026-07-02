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


// This code defines a custom React hook called `useAuth` that provides authentication-related functionality for a web application. 
// It interacts with a Redux store to manage the authentication state and provides methods for logging in, signing up, logging out,
//  and dismissing error messages. The hook uses `react-hot-toast` for displaying success and error notifications and `react-router-dom`
//  for navigation after authentication actions. The returned object includes the current authentication state along with the defined methods.