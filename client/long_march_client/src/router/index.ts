import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "layouts/index.vue";
import Login from "views/Login.vue"
export const routes = [
  {
    path: "/",
    component: Layout,
  },
  {
    path: "/login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
