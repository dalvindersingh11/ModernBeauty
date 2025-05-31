// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../Constant/apiUrl';

export type credential = {
 email: string;
 password: string;
};
export const loginUser = createAsyncThunk(
 'auth/loginUser',
 async ({ email, password }: credential, { rejectWithValue }) => {
  try {
   const response = await axios.post(
    BASE_URL + 'login',
    {
     email,
     password
    },
    {
     headers: {
      'Content-Type': 'application/json'
     }
    }
   );

   return response.data; // Assuming response has { token, user }
  } catch (error: any) {
   return rejectWithValue(error.response.data || 'Login failed');
  }
 }
);

const authSliceReducer = createSlice({
 name: 'auth',
 initialState: {
  user: null,
  token: null,
  loading: false,
  error: null as any
 },
 reducers: {
  logout: (state) => {
   state.user = null;
   state.token = null;
  }
 },
 extraReducers: (builder) => {
  builder
   .addCase(loginUser.pending, (state) => {
    state.loading = true;
    state.error = null;
   })
   .addCase(loginUser.fulfilled, (state, action) => {
    state.loading = false;
    state.token = action.payload.token;
    state.user = action.payload.user;
   })
   .addCase(loginUser.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload || 'Login failed';
   });
 }
});

export const { logout } = authSliceReducer.actions;
export default authSliceReducer.reducer;
