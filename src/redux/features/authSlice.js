import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';

export const googleSinIn = createAsyncThunk(
  'auth/googleSinIn',
  async ({ result, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.googleSignIn(result);
      toast.success('Google Sign-in successfully');
      navigate('/');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.signIn(formValue);
      navigate('/');
      toast.success('Login successfully');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.signUp(formValue);
      toast.success('Register Successfully');
      navigate('/');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, error: '', loading: false },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLogout: (state, action) => {
      localStorage.clear();
      state.user = null;
    },
  },
  extraReducers: {
    [googleSinIn.pending]: (state, action) => {
      state.user = null;
      state.error = '';
      state.loading = true;
    },
    [googleSinIn.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.error = '';
      state.loading = false;
      localStorage.setItem('profile', JSON.stringify(action.payload));
    },
    [googleSinIn.rejected]: (state, action) => {
      state.user = null;
      state.error = action.payload.message;
      state.loading = false;
    },
    [login.pending]: (state, action) => {
      state.user = null;
      state.error = '';
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.error = '';
      state.loading = false;
      localStorage.setItem('profile', JSON.stringify(action.payload));
    },
    [login.rejected]: (state, action) => {
      state.user = null;
      state.error = action.payload.message;
      state.loading = false;
    },
    [register.pending]: (state, action) => {
      state.user = null;
      state.error = '';
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.error = '';
      state.loading = false;
      localStorage.setItem('profile', JSON.stringify(action.payload));
    },
    [register.rejected]: (state, action) => {
      state.user = null;
      state.error = action.payload.message;
      state.loading = false;
    },
  },
});

export const { setUser, setLogout } = authSlice.actions;
export default authSlice.reducer;
