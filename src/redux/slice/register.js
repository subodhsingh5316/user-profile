import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchRegisterData = createAsyncThunk(
    'register/fetchByIdStatus',
    async (userId, thunkAPI) => {
      const response = await axios.get(`http://localhost:3001/register`)
      return response.data
    }
  )


  export const RegisterSlice = createSlice({
    name: 'register',
    initialState:{
        registerData:[],
        loading: false,
        error:false
    },
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchRegisterData.pending, (state, action) => {
        state.loading = true;
        state.error = false;
        state.registerData = []
      })
      builder.addCase(fetchRegisterData.fulfilled, (state, action) => {
        state.registerData = action.payload
        state.error = false;
        state.loading = false;
      })
      builder.addCase(fetchRegisterData.rejected, (state, action) => {
        state.error = action.payload;
        state.registerData = [];
        state.loading = false;
      })
    },
  })


  
  export default RegisterSlice.reducer;

