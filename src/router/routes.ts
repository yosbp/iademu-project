import DefaultLayout from "@/layouts/Default.vue";
import { defineAsyncComponent } from "vue";

const BasicLayout = defineAsyncComponent(() => import("@/layouts/Basic.vue"));
const CoverLayout = defineAsyncComponent(() => import("@/layouts/Cover.vue"));

const dashboardRoutes = [
  {
    path: "/",
    name: "HR",
    component: () => import("@/views/dashboard/index.vue"),
    meta: {
      title: "HR",
      authRequired: true,
      layout: DefaultLayout,
    },
  },
];
const invoiceRoutes = [
  {
    path: "/invoice/list",
    name: "InvoiceList",
    component: () => import("@/views/invoice/ListView.vue"),
    meta: {
      title: "List View",
      authRequired: true,
      layout: DefaultLayout,
    },
  },
  {
    path: "/invoice/add-new",
    name: "AddInvoice",
    component: () => import("@/views/invoice/AddNew.vue"),
    meta: {
      title: "Add New",
      authRequired: true,
      layout: DefaultLayout,
    },
  },
  {
    path: "/invoice/overview",
    name: "InvoiceOverview",
    component: () => import("@/views/invoice/Overview.vue"),
    meta: {
      title: "Overview",
      authRequired: true,
      layout: DefaultLayout,
    },
  },
  {
    path: "/invoices",
    name: "Invoices",
    component: () => import("@/views/invoice/index.vue"),
    meta: {
      title: "Overview",
      authRequired: true,
      layout: DefaultLayout,
    },
  },
];
const providersRoutes = [
  {
    path: "/providers",
    name: "Providers",
    component: () => import("@/views/providers/index.vue"),
    meta: {
      title: "Providers",
      authRequired: true,
      layout: DefaultLayout,
    },
  },
];
const authRoutes = [
  {
    path: "/login",
    name: "SignInBasic",
    component: () => import("@/views/authentication/Login.vue"),
    meta: {
      title: "Sign In",
      authRequired: false,
      layout: BasicLayout,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/authentication/Register.vue"),
    meta: {
      title: "Register",
      authRequired: false,
      layout: BasicLayout,
    },
  },
];
const pagesRoutes = [
  {
    path: "/pages/404",
    name: "Error404",
    component: () => import("@/views/pages/error/404.vue"),
    meta: {
      title: "404",
      authRequired: false,
      layout: CoverLayout,
    },
  },
];

export const routes = [
  ...dashboardRoutes,
  ...invoiceRoutes,
  ...authRoutes,
  ...pagesRoutes,
  ...providersRoutes,
];
