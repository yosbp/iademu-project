import apiFetch from "@/plugins/axios";
import { defineStore } from "pinia";

const useWordStore = defineStore("word", {
  state: () => ({
    loading: false,
  }),
  actions: {
    async getGoodsAndServices(id: string) {
      this.loading = true;
      apiFetch
        .get(`/goods-and-services/${id}`, { responseType: "blob" })
        .then((response) => {
          this.loading = false;
          // Create a new blob with the response data
          const blob = new Blob([response.data], {
            type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          });

          // Create a link element, hide it, direct it towards the blob, and then 'click' it programatically
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = "2-bienes-y-servicios-recibidos.docx";
          link.click();
        });
    },
    async getApproveMemorandum(id: string) {
      apiFetch
        .get(`/approve-memorandum/${id}`, { responseType: "blob" })
        .then((response) => {
          this.loading = false;
          // Create a new blob with the response data
          const blob = new Blob([response.data], {
            type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          });

          // Create a link element, hide it, direct it towards the blob, and then 'click' it programatically
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = "7-memorandum-de-aprobacion.docx";
          link.click();
        });
    },
  },
});

export default useWordStore;
