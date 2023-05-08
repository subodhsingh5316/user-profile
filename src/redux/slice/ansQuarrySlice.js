import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchAnsQuarryData = createAsyncThunk(
    'intern/fetchByIdStatus',
    async (userId, thunkAPI) => {
      const response = await axios.get(`http://localhost:3001/Ansquarry`)
      return response.data
    }
  )


  export const AnsQuarrySlice = createSlice({
    name: 'intern',
    initialState:{
        ansData:[]
    },
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchAnsQuarryData.pending, (state, action) => {
        state.loading = true;
        state.error = false;
        state.ansData = []
      })
      builder.addCase(fetchAnsQuarryData.fulfilled, (state, action) => {
        state.ansData = action.payload
        state.error = false;
        state.loading = false;
      })
      builder.addCase(fetchAnsQuarryData.rejected, (state, action) => {
        state.error = action.payload;
        state.ansData = [];
        state.loading = false;
      })
    },
  })


  
  export default AnsQuarrySlice.reducer;

