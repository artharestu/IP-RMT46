import { createSlice } from '@reduxjs/toolkit'
import errorNotification from '../../utils/errorNotification'
import { serverRequest } from "../utils/axios";

const initialState = {
  list: [],
}

export const counterSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.list = action.payload
    },
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
      const response = await serverRequest({
        url: "/courses",
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        ...requestConfig,
      });

      dispatch(setCourses(response.data.data));
    } catch (error) {
      errorNotification(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }
}

export const { setCourses } = courseSlice.actions
export default courseSlice.reducer