import { configureStore } from '@reduxjs/toolkit'
import courseReducer from './features/course/courseSlice'
import categoryReducer from './features/category/categorySlice'
import profileReducer from './features/profile/profileSlice'
import subscriberReducer from './features/subscriber/subscriberSlice'
import videoReducer from './features/video/videoSlice'
import userReducer from './features/user/userSlice'

export const store = configureStore({
  reducer: {
    courses: courseReducer,
    users: userReducer,
    categories: categoryReducer,
    profiles: profileReducer,
    subscribers: subscriberReducer,
    videos: videoReducer
  },
})