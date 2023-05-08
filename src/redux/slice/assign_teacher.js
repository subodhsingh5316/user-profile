import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchAssignTeacherData = createAsyncThunk(
    'intern/fetchByIdStatus',
    async (userId, thunkAPI) => {
      const response = await axios.get(`http://localhost:3001/Assign_Teacher`)
      return response.data
    }
  )

  export const AssignTeacherSlice = createSlice({
    name: 'intern',
    initialState:{
        assign:[]
    },
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchAssignTeacherData.pending, (state, action) => {
        state.loading = true;
        state.error = false;
        state.assign = []
      })
      builder.addCase(fetchAssignTeacherData.fulfilled, (state, action) => {
        state.assign = action.payload
        state.error = false;
        state.loading = false;
      })
      builder.addCase(fetchAssignTeacherData.rejected, (state, action) => {
        state.error = action.payload;
        state.courseData = [];
        state.loading = false;
      })
    },

  })


  
  export default AssignTeacherSlice.reducer;

