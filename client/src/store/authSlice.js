import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../services/api.js';

const token = localStorage.getItem('banking_token');
const savedUser = localStorage.getItem('banking_user');

export const loginUser = createAsyncThunk('auth/login', async (payload) => {
  const { data } = await api.post('/auth/login', payload);
  return data;
});

export const registerUser = createAsyncThunk('auth/register', async (payload) => {
  const { data } = await api.post('/auth/register', payload);
  return data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token,
    user: savedUser ? JSON.parse(savedUser) : null,
    status: 'idle',
    error: null
  },
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem('banking_token');
      localStorage.removeItem('banking_user');
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher((action) => action.type.startsWith('auth/') && action.type.endsWith('/pending'), (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addMatcher((action) => action.type.startsWith('auth/') && action.type.endsWith('/fulfilled'), (state, action) => {
        state.status = 'idle';
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem('banking_token', action.payload.token);
        localStorage.setItem('banking_user', JSON.stringify(action.payload.user));
      })
      .addMatcher((action) => action.type.startsWith('auth/') && action.type.endsWith('/rejected'), (state, action) => {
        state.status = 'idle';
        state.error = action.error.message;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
