import { createSlice } from '@reduxjs/toolkit'
import errorNotification from '../../utils/errorNotification'
import { serverRequest } from "../../utils/axios";

const initialState = {
  list: [],
  myCourses: [],
  detail: {},
}

export const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.list = action.payload
    },
    setMyCourses: (state, action) => {
      state.myCourses = action.payload
    },
    setCourseDetail: (state, action) => {
      state.detail = action.payload
    }
  },
})

export const fetchCourses = (isNewest, search, categoryId, setIsLoading) => {
  const requestConfig = {
    params: {},
  };

  isNewest
    ? (requestConfig.params.sort = "DESC")
    : (requestConfig.params.sort = "ASC");
  if (search) requestConfig.params.search = search;
  if (categoryId) requestConfig.params.categoryId = categoryId;

  return async (dispatch) => {
    setIsLoading(true);
    try {
      const { data } = await serverRequest({
        url: "/courses",
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        ...requestConfig,
      });

      dispatch(setCourses(data.data));
    } catch (error) {
      errorNotification(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }
}

export const fetchMyCourses = (setIsLoading) => {
  return async (dispatch) => {
    setIsLoading(true);
    try {
      const { data } = await serverRequest({
        url: "/mycourses",
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      dispatch(setMyCourses(data));
    } catch (error) {
      errorNotification(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }
}

export const fetchCourseDetail = (id, setIsLoading) => {
  return async (dispatch) => {
    setIsLoading(true);
    try {
      const { data } = await serverRequest({
        url: `/course/${id}`,
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(setCourseDetail(data));
    } catch (error) {
      errorNotification(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }
}

export const { setCourses, setMyCourses, setCourseDetail } = courseSlice.actions
export default courseSlice.reducer