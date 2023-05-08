import { configureStore } from '@reduxjs/toolkit'
import AnsQyarryReducer from './slice/ansQuarrySlice';
import QuarryReducer from './slice/quarrySlice';
import dataListReducer from './slice/dataListSlice';
import assign_teacherReducer from './slice/assign_teacher';
import RegisterReducer from './slice/register'

export const store = configureStore({
  reducer: {
    AnsQyarryReducer,
    QuarryReducer,
    dataListReducer,
    assign_teacherReducer,
    RegisterReducer
  },
})