import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials) => {
    const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
    return response.data;
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData) => {
    const response = await axios.post('http://localhost:5000/api/auth/register', userData);
    return response.data;
  }
);

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  token: localStorage.getItem('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = null;
      state.token = null;
      localStorage.removeItem('token');
    },
    updateUserVerification: (state, action) => {
      if (state.user) {
        state.user.isVerified = action.payload;
      }
    },
    updateSocialConnections: (state, action) => {
      if (state.user) {
        state.user.socialLogins = {
          ...state.user.socialLogins,
          ...action.payload,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setUser,
  setLoading,
  setError,
  logout,
  updateUserVerification,
  updateSocialConnections,
} = authSlice.actions;

export default authSlice.reducer;
