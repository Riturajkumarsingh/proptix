import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from '@services/auth.service';
import toast from 'react-hot-toast';

// ── Async Thunks ──────────────────────────────────────────────────────────────

export const loginUser = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await authAPI.login(credentials);
    return data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Login failed');
  }
});

export const registerUser = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
  try {
    const { data } = await authAPI.register(userData);
    return data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Registration failed');
  }
});

export const refreshAccessToken = createAsyncThunk('auth/refresh', async (_, { rejectWithValue }) => {
  try {
    const { data } = await authAPI.refresh();
    return data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Session expired');
  }
});

export const logoutUser = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await authAPI.logout();
  } catch (err) {
    // Always clear local state even if API fails
  }
});

export const fetchMe = createAsyncThunk('auth/me', async (_, { rejectWithValue }) => {
  try {
    const { data } = await authAPI.getMe();
    return data.data.user;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch profile');
  }
});

// ── Slice ─────────────────────────────────────────────────────────────────────

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user:        null,
    accessToken: localStorage.getItem('accessToken') || null,
    isAuth:      false,
    isLoading:   false,
    error:       null,
    initialized: false,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user        = user;
      state.accessToken = accessToken;
      state.isAuth      = true;
      if (accessToken) localStorage.setItem('accessToken', accessToken);
    },
    clearCredentials: (state) => {
      state.user        = null;
      state.accessToken = null;
      state.isAuth      = false;
      localStorage.removeItem('accessToken');
    },
    updateUser: (state, action) => {
      if (state.user) state.user = { ...state.user, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading  = false;
        state.user       = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isAuth     = true;
        localStorage.setItem('accessToken', action.payload.accessToken);
        toast.success(`Welcome back, ${action.payload.user.name}!`);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error     = action.payload;
        toast.error(action.payload);
      });

    // Register
    builder
      .addCase(registerUser.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        toast.success('Account created! Please log in.');
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error     = action.payload;
        toast.error(action.payload);
      });

    // Refresh
    builder
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        localStorage.setItem('accessToken', action.payload.accessToken);
      })
      .addCase(refreshAccessToken.rejected, (state) => {
        state.user        = null;
        state.accessToken = null;
        state.isAuth      = false;
        localStorage.removeItem('accessToken');
      });

    // Logout
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user        = null;
      state.accessToken = null;
      state.isAuth      = false;
      state.initialized = true;
      localStorage.removeItem('accessToken');
      toast.success('Logged out successfully');
    });

    // Fetch Me
    builder
      .addCase(fetchMe.pending, (state) => { state.isLoading = true; })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user        = action.payload;
        state.isAuth      = true;
        state.isLoading   = false;
        state.initialized = true;
      })
      .addCase(fetchMe.rejected, (state) => {
        state.user        = null;
        state.isAuth      = false;
        state.isLoading   = false;
        state.initialized = true;
        localStorage.removeItem('accessToken');
      });
  },
});

export const { setCredentials, clearCredentials, updateUser } = authSlice.actions;

// ── Selectors ─────────────────────────────────────────────────────────────────
export const selectUser        = (state) => state.auth.user;
export const selectIsAuth      = (state) => state.auth.isAuth;
export const selectAccessToken = (state) => state.auth.accessToken;
export const selectAuthLoading = (state) => state.auth.isLoading;
export const selectInitialized = (state) => state.auth.initialized;
export const selectUserRole    = (state) => state.auth.user?.role;

export default authSlice.reducer;
