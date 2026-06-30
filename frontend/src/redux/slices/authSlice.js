import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '@services/authService.js';



export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try { return await authService.login(credentials); }
    catch (err) { return rejectWithValue(err.response?.data?.message || 'Login failed.'); }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try { return await authService.register(userData); }
    catch (err) { return rejectWithValue(err.response?.data?.message || 'Registration failed.'); }
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
  async (_, { rejectWithValue }) => {
    try { return await authService.logout(); }
    catch (err) { return rejectWithValue(err.response?.data?.message); }
  }
);

const pending  = (state)              => { state.isLoading = true;  state.error = null; };
const rejected = (state, { payload }) => { state.isLoading = false; state.error = payload; };

// login + register both return { message, user }
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
    // We can't confirm auth state without a network call on boot.
    // Set to false; ProtectedRoutes calls fetchCurrentUser on mount.
    isAuthenticated: false,
  },
  reducers: {
    clearError:   (state) => { state.error = null; },
    // Optimistic logout (before server confirms) — used by Sidebar
    clearAuth:    (state) => {
      state.user            = null;
      state.isAuthenticated = false;
    },
    updateUser: (state, { payload }) => {
    state.user = payload;
  },
  },
  extraReducers: (b) => {
    b
      .addCase(loginUser.pending,          pending)
      .addCase(loginUser.fulfilled,        authFulfilled)
      .addCase(loginUser.rejected,         rejected)
      .addCase(registerUser.pending,       pending)
      .addCase(registerUser.fulfilled,     authFulfilled)
      .addCase(registerUser.rejected,      rejected)
      .addCase(fetchCurrentUser.pending,   pending)
      .addCase(fetchCurrentUser.fulfilled, (state, { payload }) => {
        state.isLoading       = false;
        state.user            = payload.user;
        state.isAuthenticated = true;
      })
      .addCase(fetchCurrentUser.rejected,  (state) => {
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
        // Even if server logout fails, clear local state
        state.user            = null;
        state.isAuthenticated = false;
        state.isLoading       = false;
      });
  },
});

export const { clearError, clearAuth ,updateUser } = authSlice.actions;
export default authSlice.reducer;
