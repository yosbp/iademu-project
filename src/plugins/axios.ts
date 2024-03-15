import axios from "axios";
import router from "@/router";
import appConfigs from "@/app/appConfig.ts";

const apiFetch = axios.create({
  baseURL: appConfigs.defaultApiUrl,
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
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      router.push("/login");
      return Promise.reject('Unauthorized');
    }
    return Promise.reject(error);
  }
);

export default apiFetch;
