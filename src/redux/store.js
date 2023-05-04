import { configureStore } from '@reduxjs/toolkit'
import InterReducer from './slice/internSlice';
import QuarryReducer from './slice/quarrySlice'

export const store = configureStore({
  reducer: {
    InterReducer,
    QuarryReducer
  },
})