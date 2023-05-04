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
        quarry:[]
    },
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchQuarryData.pending, (state, action) => {
        state.quarry.push(action.payload)
      })
      builder.addCase(fetchQuarryData.fulfilled, (state, action) => {
        state.quarry.push(action.payload)
      })
      builder.addCase(fetchQuarryData.rejected, (state, action) => {
        state.quarry.push(action.payload)
      })
    },
  })


  export default quarrySlice.reducer;