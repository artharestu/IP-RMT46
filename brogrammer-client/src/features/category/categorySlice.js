import { serverRequest } from "../../utils/axios";
import errorNotification from "../../utils/errorNotification";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
}

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.list = action.payload
    }
  },
})
export const fetchCategories = () => {
  return async (dispatch) => {
    try {
      const { data } = await serverRequest({
        url: "/categories",
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(setCategories(data));
    } catch (error) {
      errorNotification(error.response.data.message);
    }
  }
}

export const { setCategories } = categorySlice.actions
export default categorySlice.reducer