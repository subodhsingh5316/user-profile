import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchInterData = createAsyncThunk(
    'users/fetchByIdStatus',
    async (userId, thunkAPI) => {
      const response = await axios.get(`http://localhost:3001/posts`)
      return response.data
    }
  )


  export const InterSlice = createSlice({
    name: 'intern',
    initialState:{
        courseData:[]
    },
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchInterData.pending, (state, action) => {
        state.courseData.push(action.payload)
      })
      builder.addCase(fetchInterData.fulfilled, (state, action) => {
        state.courseData.push(action.payload)
      })
      builder.addCase(fetchInterData.rejected, (state, action) => {
        state.courseData.push(action.payload)
      })
    },
  })


  
  export default InterSlice.reducer;

