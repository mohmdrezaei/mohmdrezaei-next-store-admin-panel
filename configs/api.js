import axios from "axios";
import { getCookie } from "../utils/cookie";

const api = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (request) => {
    const token = getCookie("token");

    if (token) {
      request.headers["Authorization"] = `Bearer ${token}`;
    }
    return request;
  },
  (error) =>{
    return Promise.reject(error);
  }
);

api.interceptors.response.use((response) => {
  return response.data;
});

export default api;
