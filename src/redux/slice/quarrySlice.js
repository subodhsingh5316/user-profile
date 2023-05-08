import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export  const fetchQuarryData = createAsyncThunk(
    'users/fetchByIdStatus',
    async (userId, thunkAPI) => {
      const response = await axios.get(`http://localhost:3001/quarry`)
      return response.data
    }
  )


export const quarrySlice = createSlice({
    name: 'intern',
    initialState:{
        quarry:[],
        loading:false,
        error:false
    },
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchQuarryData.pending, (state, action) => {
        state.loading = true;
        state.error = false;
        state.quarry = []
      })
      builder.addCase(fetchQuarryData.fulfilled, (state, action) => {
        state.quarry = action.payload
        state.error = false;
        state.loading = false;
      })
      builder.addCase(fetchQuarryData.rejected, (state, action) => {
        state.error = action.payload;
        state.quarry = [];
        state.loading = false;
      })
    },
  })


  export default quarrySlice.reducer;