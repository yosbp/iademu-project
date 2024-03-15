import apiFetch from "@/plugins/axios";
import { Order } from "@/types/Order";
import { defineStore } from "pinia";

const useOrderStore = defineStore("order", {
  state: () => ({
    loading: false,
    orders: [] as Order[],
  }),
  actions: {
    async createOrder(data: any) {
      this.loading = true;
      return apiFetch
        .post("/orders", data)
        .then((response) => {
          this.loading = false;
          return response;
        })
        .catch((error) => {
          this.loading = false;
          throw error;
        });
    },
    async getOrders() {
      this.loading = true;
      return apiFetch
        .get("/orders")
        .then((response) => {
          this.loading = false;
          this.orders = response.data;
        })
        .catch((error) => {
          this.loading = false;
          throw error;
        });
    },
    async getOrder(id: string) {
      this.loading = true;
      return apiFetch
        .get(`/orders/${id}`)
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

export default useOrderStore;
