import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from 'axios';



export const fetchDataList = createAsyncThunk(
    'dataList/fetchbyuser',
    async (userId, thunkAPI) => {
        const response = await axios.get(`http://localhost:3001/posts`)
        return response.data
      }
)

export const dataListSlice = createSlice({
  name:'dataList',
  initialState:{
    dataList:[]
  },
  reducers:{},
  extraReducers: (builder) => {
   builder.addCase(fetchDataList.pending, (state, action) => {
     state.loading = true;
     state.error = false;
     state.dataList = []
   })
   builder.addCase(fetchDataList.fulfilled, (state, action) => {console.log("action.payload",action.payload)
     state.dataList = action.payload
     state.error = false;
     state.loading = false;
   })
   builder.addCase(fetchDataList.rejected, (state, action) => {
     state.error = action.payload;
     state.dataList = [];
     state.loading = false;
   })
 },  
})


export default dataListSlice.reducer;