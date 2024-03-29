import apiFetch from "@/plugins/axios";
import { Provider } from "@/types/Provider";
import { defineStore } from "pinia";

const useProviderStore = defineStore("provider", {
  state: () => ({
    loading: false,
    providers: [] as Provider[],
  }),
  actions: {
    async createProvider(data: any) {
      this.loading = true;
      return apiFetch
        .post("/providers", data)
        .then((response) => {
          this.loading = false;
          return response;
        })
        .catch((error) => {
          this.loading = false;
          throw error;
        });
    },
    async updateProvider(id: any, data: any) {
      this.loading = true;
      return apiFetch
        .put(`/providers/${id}`, data)
        .then((response) => {
          this.loading = false;
          return response;
        })
        .catch((error) => {
          this.loading = false;
          throw error;
        });
    },
    async getProviders() {
      this.loading = true;
      return apiFetch
        .get("/providers")
        .then((response) => {
          this.loading = false;
          this.providers = response.data;
        })
        .catch((error) => {
          this.loading = false;
          throw error;
        });
    },
  },
});

export default useProviderStore;
