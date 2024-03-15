import apiFetch from "@/plugins/axios";
import { Provider } from "@/types/Provider";
import { defineStore } from "pinia";

const useExcelStore = defineStore("excel", {
  state: () => ({
    loading: false,
    providers: [] as Provider[],
  }),
  actions: {
    async getPaymentOrder(id: string) {
      this.loading = true;
      apiFetch
        .get(`/payment-order/${id}`, { responseType: "blob" })
        .then((response) => {
          this.loading = false;
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
    async getBuyOrder(id: string) {
      this.loading = true;
      apiFetch
        .get(`/buy-order/${id}`, { responseType: "blob" })
        .then((response) => {
          this.loading = false;
          // Create a new blob with the response data
          const blob = new Blob([response.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });

          // Create a link element, hide it, direct it towards the blob, and then 'click' it programatically
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = "1-orden-de-compra.xlsx";
          link.click();
        });
    },
  },
});

export default useExcelStore;
