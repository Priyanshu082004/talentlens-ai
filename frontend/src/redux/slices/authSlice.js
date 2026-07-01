import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '@services/authService';
import { resetResume } from './resumeSlice';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const data = await authService.login(credentials);
      // Clear previous user's resume data BEFORE new user state is set
      dispatch(resetResume());
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Login failed.');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const data = await authService.register(userData);
      // Clear previous user's resume data BEFORE new user state is set
      dispatch(resetResume());
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Registration failed.');
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'auth/me',
  async (_, { rejectWithValue }) => {
    try { return await authService.me(); }
    catch (err) { return rejectWithValue(err.response?.data?.message); }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const data = await authService.logout();
      dispatch(resetResume()); // clear on successful logout
      return data;
    } catch (err) {
      dispatch(resetResume()); // clear even if server call fails
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

const pending       = (state)              => { state.isLoading = true;  state.error = null; };
const rejected      = (state, { payload }) => { state.isLoading = false; state.error = payload; };
const authFulfilled = (state, { payload }) => {
  state.isLoading       = false;
  state.user            = payload.user;
  state.isAuthenticated = true;
  state.error           = null;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user:            null,
    isLoading:       false,
    error:           null,
    isAuthenticated: false,
  },
  reducers: {
    clearError: (state) => { state.error = null; },
    clearAuth:  (state) => {
      state.user            = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (b) => {
    b
      .addCase(loginUser.pending,           pending)
      .addCase(loginUser.fulfilled,         authFulfilled)
      .addCase(loginUser.rejected,          rejected)
      .addCase(registerUser.pending,        pending)
      .addCase(registerUser.fulfilled,      authFulfilled)
      .addCase(registerUser.rejected,       rejected)
      .addCase(fetchCurrentUser.pending,    pending)
      .addCase(fetchCurrentUser.fulfilled,  (state, { payload }) => {
        state.isLoading       = false;
        state.user            = payload.user;
        state.isAuthenticated = true;
      })
      .addCase(fetchCurrentUser.rejected,   (state) => {
        state.isLoading       = false;
        state.user            = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user            = null;
        state.isAuthenticated = false;
        state.isLoading       = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        // Even if server logout fails, clear local auth state
        state.user            = null;
        state.isAuthenticated = false;
        state.isLoading       = false;
      });
  },
});

export const { clearError, clearAuth } = authSlice.actions;
export default authSlice.reducer;