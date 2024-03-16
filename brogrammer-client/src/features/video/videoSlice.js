import { createSlice } from "@reduxjs/toolkit";
import errorNotification from "../../utils/errorNotification";
import { serverRequest } from "../../utils/axios";

const initialState = {
  detail: {}
}

export const videoSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    setVideo: (state, action) => {
      state.detail = action.payload
    }
  },
})

export const fetchVideos = (id, setIsLoading) => {
  return async (dispatch) => {
    setIsLoading(true);
    try {
      const { data } = await serverRequest({
        url: `/video/${id}`,
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      dispatch(setVideo(data));
    } catch (error) {
      console.log(error)
      errorNotification(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }
}
export const { setVideo } = videoSlice.actions
export default videoSlice.reducer