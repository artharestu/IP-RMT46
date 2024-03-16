import { createSlice } from '@reduxjs/toolkit'
import showToast from '../../utils/toast'
import errorNotification from '../../utils/errorNotification'
import { serverRequest } from '../../utils/axios'

const initialState = {
}

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
  },
})

export const login = (user, setIsLoading, navigate) => {
  return async () => {
    setIsLoading(true);
    try {
      const { data } = await serverRequest({
        method: "post",
        url: "/login",
        data: user,
      });
      localStorage.setItem("token", data.access_token);
      showToast("Login Successful..");
      navigate("/");
    } catch (error) {
      console.log(error)
      errorNotification(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }
}

export const googleLogin = (googleToken, setIsLoading, navigate) => {
  return async () => {
    setIsLoading(true);
    try {
      const { data } = await serverRequest({
        method: "post",
        url: "/google-login",
        data: { googleToken },
      });
      localStorage.setItem("token", data.access_token);
      showToast("Login Successful..");
      navigate("/");
    } catch (error) {
      errorNotification(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }
}

export const register = (user, setIsLoading, navigate) => {
  return async () => {
    setIsLoading(true);
    try {
      await serverRequest({
        method: "post",
        url: "/register",
        data: user,
      });
      showToast("Registration Successful..");
      navigate("/login");
    } catch (error) {
      errorNotification(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }
}
export default userSlice.reducer