import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import Layout from "layouts/index.vue";
import Login from "views/Login.vue"
export const routes = [
  {
    path: "/",
    name:'home',
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
  },
  {
    path: "/edit",
    name:'edit',
    component: ()=>import('views/EditInfo.vue'),
  }
];

const router = createRouter({
  // history: createWebHashHistory(),
  history:createWebHistory(),
  routes,
});

export default router;
