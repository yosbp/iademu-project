import DefaultLayout from "@/layouts/Default.vue";
import { defineAsyncComponent } from "vue";

const BasicLayout = defineAsyncComponent(() => import("@/layouts/Basic.vue"));
const CoverLayout = defineAsyncComponent(() => import("@/layouts/Cover.vue"));

const dashboardRoutes = [
  {
    path: "/",
    name: "Panel",
    component: () => import("@/views/dashboard/index.vue"),
    meta: {
      title: "Panel",
      authRequired: true,
      layout: DefaultLayout,
    },
  },
];
const orderRoutes = [
  {
    path: "/order/add-new",
    name: "AddOrder",
    component: () => import("@/views/order/AddNew.vue"),
    meta: {
      title: "Añadir Orden",
      authRequired: true,
      layout: DefaultLayout,
    },
  },
  {
    path: "/order/view/:id",
    name: "ViewOrder",
    component: () => import("@/views/order/View.vue"),
    meta: {
      title: "Ordenes",
      authRequired: true,
      layout: DefaultLayout,
    },
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("@/views/order/index.vue"),
    meta: {
      title: "Lista de Ordenes",
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
  ...authRoutes,
  ...pagesRoutes,
  ...providersRoutes,,
  ...orderRoutes,
];
