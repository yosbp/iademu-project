import { defineStore } from "pinia";
import axios from "axios";
import { User, UserLogin } from "@/types/User";
import appConfigs from "@/app/appConfig.ts";

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      user: localStorage.getItem("user") || (null as User | null),
      loading: false,
    };
  },
  actions: {
    async login(data: UserLogin) {
      this.loading = true;
      return await axios
        .post(`${appConfigs.defaultApiUrl}/login`, data)
        .then((response) => {
          this.user = response.data;
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("token", response.data.token);
          this.loading = false;
          return true;
        })
        .catch((error) => {
          this.loading = false;
          // Handle error
          if (
            error.response &&
            error.response.data &&
            error.response.data.errors
          ) {
            // Get the first error message
            const firstError =
              error.response.data.errors[
                Object.keys(error.response.data.errors)[0]
              ];

            // Push the error message to the errors array
            throw new Error(firstError[0]);
          } else {
            // If there is no error message, throw the error object
            throw error.response.data.message;
          }
        });
    },
    async register(data: any) {
      this.loading = true;
      return await axios
        .post(`${appConfigs.defaultApiUrl}/register`, data)
        .then((response) => {
          this.user = response.data.user;
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("token", response.data.token);
          this.loading = false;
          return true;
        })
        .catch((error) => {
          this.loading = false;
          // Handle error
          if (
            error.response &&
            error.response.data &&
            error.response.data.errors
          ) {
            // Get the first error message
            const firstError =
              error.response.data.errors[
                Object.keys(error.response.data.errors)[0]
              ];

            // Push the error message to the errors array
            throw new Error(firstError[0]);
          } else {
            // If there is no error message, throw the error object
            throw error;
          }
        });
    },
    async logout() {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      this.user = null;
    },
  },
});
