import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Booking from "../views/Booking.vue";
import Menu from "../views/Menu.vue";
import Register from "../views/Register.vue";
import Signin from "../views/Signin.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import Dashboard from "../views/Dashboard.vue"
import StaffPortal from "../views/StaffPortal.vue";
import About from "../views/About.vue";
import FAQs from "../views/FAQs.vue";

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
    name: "Signin",
    component: Signin,
  },
  {
    path: "/ForgotPassword",
    name: "Forgot Password",
    component: ForgotPassword,
  },
  {
    path: "/Dashboard",
    name: "Dashboard",
    component: Dashboard, 
  },
  {
    path: "/Staff",
    name: "StaffPortal",
    component: StaffPortal,
  },
  {
    path:"/About",
    name: "About",
    component: About,
  },
  {
    path:"/FAQs",
    name:"FAQs",
    component: FAQs,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
