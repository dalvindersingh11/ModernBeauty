// src/redux/slices/signupSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../Constant/apiUrl';

// Async thunk for signup
export const signupUser = createAsyncThunk(
 'signup/signupUser',
 async (
  { name, email, password, password_confirmation }: any,
  { rejectWithValue }
 ) => {
  try {
   const response = await axios.post(
    `${BASE_URL}register`,
    {
     name,
     email,
     password,
     password_confirmation
    },
    {
     headers: {
      'Content-Type': 'application/json'
     }
    }
   );
   return response.data;
  } catch (error: any) {
   return rejectWithValue(error.response?.data || error.message);
  }
 }
);

const signupSlice = createSlice({
 name: 'signup',
 initialState: {
  user: null,
  loading: false,
  error: null as any
 },
 reducers: {},
 extraReducers: (builder) => {
  builder
   .addCase(signupUser.pending, (state) => {
    state.loading = true;
    state.error = null;
   })
   .addCase(signupUser.fulfilled, (state, action) => {
    state.loading = false;
    state.user = action.payload;
   })
   .addCase(signupUser.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
   });
 }
});

export default signupSlice.reducer;
