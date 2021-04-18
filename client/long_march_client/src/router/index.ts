import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import Layout from "layouts/index.vue";
import Login from "views/Login.vue"
export const routes = [
  {
    path: "/",
    component: Layout,
  },
  {
    path: "/login",
    name:'login',
    component: Login,
  },
  {
    path: "/register",
    name:'register',
    component: ()=>import('views/Register.vue'),
  }
];

const router = createRouter({
  // history: createWebHashHistory(),
  history:createWebHistory(),
  routes,
});

export default router;
