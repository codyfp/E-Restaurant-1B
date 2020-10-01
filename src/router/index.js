import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Booking from "../views/Booking.vue";
import Menu from "../views/Menu.vue";
import Register from "../views/Register.vue";
import Signin from "../views/Signin.vue";

Vue.use(VueRouter);
Vue.use(require("vue-moment"));

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/Booking",
    name: "Booking",
    component: Booking,
  },
  {
    path: "/menu",
    name: "Menu",
    component: Menu,
  },
  {
    path: "/Register",
    name: "Register",
    component: Register,
  },
  {
    path: "/Signin",
    name: "Signinr",
    component: Signin,
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
