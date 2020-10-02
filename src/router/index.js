import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Booking from "../views/Booking.vue";
import Menu from "../views/Menu.vue";
import EditOrder from "../views/EditOrder";
import EditBooking from "../views/EditBooking";

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
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
