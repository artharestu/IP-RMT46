import { configureStore } from '@reduxjs/toolkit'
import courseReducer from './features/course/courseSlice'
import categoryReducer from './features/category/categorySlice'
import profileReducer from './features/profile/profileSlice'

export const store = configureStore({
  reducer: {
    courses: courseReducer,
    categories: categoryReducer,
    profiles: profileReducer
  },
})