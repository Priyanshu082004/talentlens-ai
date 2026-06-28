import {createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import authService from '@services/authService.js';


export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {return await authService.login(credentials);}
        catch (error) {return rejectWithValue(error.response?.data?.message || 'Login Failed');}
    }
)


export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try { return await authService.register(userData); }
    catch (err) { return rejectWithValue(err.response?.data?.message || 'Registration failed'); }
  }
);


export const fetchCurrentUser = createAsyncThunk(
  'auth/me',
  async (_, { rejectWithValue }) => {
    try { return await authService.me(); }
    catch (err) { return rejectWithValue(err.response?.data?.message); }
  }
);


const handlePending = (state) => { state.isloading = true; state.error = null; };
const handleRejected = (state, { payload }) => { state.isloading = false; state.error = payload || 'An error occurred'; };
const handleAuthFulfilled = (state, { payload }) => {
  state.isloading = false;
  state.user = payload.user;
  state.token = payload.token;
  state.isAuthenticated = true;
  localStorage.setItem('token', payload.token);
};


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: localStorage.getItem('token') || null,
        isLoading: false,
        error: null,
        isAuthenticated: !!localStorage.getItem('token'),
},
    reducers: {
    logoutUser: (state) => {
      state.user            = null;
      state.token           = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    clearError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending,          handlePending)
      .addCase(loginUser.fulfilled,        handleAuthFulfilled)
      .addCase(loginUser.rejected,         handleRejected)
      .addCase(registerUser.pending,       handlePending)
      .addCase(registerUser.fulfilled,     handleAuthFulfilled)
      .addCase(registerUser.rejected,      handleRejected)
      .addCase(fetchCurrentUser.pending,   handlePending)
      .addCase(fetchCurrentUser.fulfilled, (state, { payload }) => {
        state.isLoading       = false;
        state.user            = payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchCurrentUser.rejected,  (state) => {
        state.isLoading       = false;
        state.token           = null;
        state.isAuthenticated = false;
        localStorage.removeItem('token');
      });
  },
});

export const { logoutUser, clearError } = authSlice.actions;
export default authSlice.reducer; 