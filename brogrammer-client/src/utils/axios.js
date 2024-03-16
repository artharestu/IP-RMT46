import axios from "axios";

export const serverRequest = axios.create({
  // baseURL: 'http://localhost:3000'
  baseURL: 'https://cp-api.artharestu.com'
})
