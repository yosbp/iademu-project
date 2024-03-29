import { App, createApp } from "vue";
import "@/assets/scss/tailwind.scss";
import MainApp from "@/App.vue";
import i18n from "@/plugins/i18n";
import router from "@/router/index";
import { createPinia } from 'pinia'
import VueApexCharts from "vue3-apexcharts";
import PageHeader from "@/app/common/PageHeader.vue";
import simplebar from "simplebar-vue";
import VueTippy from "vue-tippy";
import Popper from "vue3-popper";

import { vMaska } from "maska";
import VueEasyLightbox from "vue-easy-lightbox";
import { initGlobalComponents } from "@/plugins/components";

export const app: App = createApp(MainApp);
initGlobalComponents(app);

app.use(createPinia());
app.use(i18n);
app.use(VueApexCharts);
app.use(router);
app.use(
  VueTippy,
  // optional
  {
    directive: "tippy", // => v-tippy
    component: "tippy", // => <tippy/>
  }
);
app.use(VueEasyLightbox);
app.directive("maska", vMaska);
app.component("simplebar", simplebar);
app.component("PageHeader", PageHeader);
app.component("Popper", Popper);

app.mount("#app");
