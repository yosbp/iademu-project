import apiFetch from "@/plugins/axios";
import { Provider } from "@/types/Provider";
import { defineStore } from "pinia";

const useExcelStore = defineStore("excel", {
  state: () => ({
    loading: false,
    providers: [] as Provider[],
  }),
  actions: {
    async getPaymentOrders() {
        apiFetch.get("/get-excel", {responseType: 'blob'}).then((response) => {
            // Create a new blob with the response data
            const blob = new Blob([response.data], {
              type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
        
            // Create a link element, hide it, direct it towards the blob, and then 'click' it programatically
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = "orden-de-pago.xlsx";
            link.click();
          });
    },
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

export default useExcelStore;
