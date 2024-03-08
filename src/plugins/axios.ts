import axios from "axios";
import router from "@/router";

const apiFetch = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

apiFetch.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem("token");
    if (token) {
      request.headers.Authorization = "Bearer " + token;
    }
    return request;
  },
  (error) => {
    if (error.response.status === 401) {
      router.push("/login");
    }
    return Promise.reject(error);
  }
);

export default apiFetch;
