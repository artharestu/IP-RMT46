import { createSlice } from "@reduxjs/toolkit";
import { serverRequest } from "../../utils/axios";

const initialState = {
  detail: {},
  status: "unsubscribed"
}

export const subscriberSlice = createSlice({
  name: 'subscribers',
  initialState,
  reducers: {
    setSubscribers: (state, action) => {
      state.detail = action.payload
    },
    setStatus: (state, action) => {
      state.status = action.payload
    }
  },
})

export const fetchSubscribers = (id, setIsLoading) => {
  return async (dispatch) => {
    setIsLoading(true);
    try {
      const { data } = await serverRequest({
        url: `/subscriber/${id}`,
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!data) return;

      dispatch(setSubscribers(data));
      dispatch(setStatus(data.status));
    } catch (error) {
      if (error.response) errorNotification(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }
}

export const { setSubscribers, setStatus } = subscriberSlice.actions
export default subscriberSlice.reducer