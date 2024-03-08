import { createRouter, createWebHistory } from "vue-router";
import { routes } from "@/router/routes.ts";

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

const title = "Iademu Dashboard";

router.beforeEach((to: any, from: any, next: any) => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  from; // NOTE: on build time it is giving error so just put it here
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r: any) => r.meta && r.meta.title);

  if (nearestWithTitle) {
    document.title = nearestWithTitle.meta.title + " | " + title || title;
  }

  // if page not exist, redirect to 404
  if (to.matched.length === 0) {
    next({ name: "Error404" });
  }

  const isAuthRequired = to.meta.authRequired;

  if (!isAuthRequired) {
    return next();
  } else {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      next();
    } else {
      router.push("/login");
    }
  }
});

export default router;
