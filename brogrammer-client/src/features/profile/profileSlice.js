import { createSlice } from "@reduxjs/toolkit";
import errorNotification from '../../utils/errorNotification'
import { serverRequest } from '../../utils/axios'
import showToast from "../../utils/toast";

const initialState = {
  detail: {}
}

export const profileSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    setDetail: (state, action) => {
      state.detail = action.payload
    }
  },
})

export const fetchProfile = (setIsLoading, setForm) => {
  return async (dispatch) => {
    setIsLoading(true);
    try {
      const { data } = await serverRequest({
        url: "/profile",
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      dispatch(setDetail(data));
      if (setForm) setForm(data);
    } catch (error) {
      console.log(error)
      errorNotification(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }
}

export const updateProfile = (form, setIsLoading, navigate) => {
  return async () => {
    setIsLoading(true);
    try {
      await serverRequest({
        url: "/profile",
        method: "put",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: form,
      });

      showToast("Profile updated successfully");
      navigate("/profile");
    } catch (error) {
      errorNotification(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }
}

export const { setDetail } = profileSlice.actions
export default profileSlice.reducer