import apiFetch from "@/plugins/axios";
import { defineStore } from "pinia";

const useDashboardStore = defineStore("dashboard", {
  state: () => ({
    loading: false,
  }),
  actions: {
    async getDashboardData() {
      this.loading = true;
      return apiFetch
        .get("/dashboard")
        .then((response) => {
          this.loading = false;
          return response.data;
        })
        .catch((error) => {
          this.loading = false;
          throw error;
        });
    },
  },
});

export default useDashboardStore;
