import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Booking from "../views/Booking.vue";
import Menu from "../views/Menu.vue";
import EditOrder from "../views/EditOrder";
import EditBooking from "../views/EditBooking";
import Register from "../views/Register.vue";
import Signin from "../views/Signin.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import Dashboard from "../views/Dashboard.vue";
import GMap from "../views/GMap.vue";

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
    path: "/EditOrder",
    name: "EditOrder",
    component: EditOrder,
  },
  {
    path: "/EditBooking",
    name: "EditBooking",
    component: EditBooking,
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
    path: "/GMap",
    name: "GMap",
    compenent: GMap,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
