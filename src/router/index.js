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
import OrderSuccess from "../views/OrderSuccess.vue";
import Dashboard from "../views/Dashboard.vue";
import StaffPortal from "../views/StaffPortal.vue";
import About from "../views/About.vue";
import FAQs from "../views/FAQs.vue";
import EditAccount from "../views/EditAccount.vue";
import firebase from 'firebase';
import ErrorSigninPage from "../views/ErrorSigninPage.vue";

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
    meta:{
      requiresAuth: true
    }
  },
  {
    path: "/menu",
    name: "Menu",
    component: Menu,
    meta:{
      requiresAuth: true
    }
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
    meta:{
      requiresAuth: true
    }
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
    meta:{
      requiresAuth: true
    }
  },
  {
    path: "/Staff",
    name: "StaffPortal",
    component: StaffPortal,
  },
  {
    path: "/About",
    name: "About",
    component: About,
  },
  {
    path: "/FAQs",
    name: "FAQs",
    component: FAQs,
  },
  {
    path: "/OrderSuccess",
    name: "OrderSuccess",
    component: OrderSuccess,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: "/EditAccount",
    name: "EditAccount",
    component: EditAccount,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: "/ErrorSigninPage",
    name: "ErrorSigninPage",
    component: ErrorSigninPage,
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  //check to see if route requires auth.
  if(to.matched.some(rec => rec.meta.requiresAuth)){
    //check auth state of user. 
    let user = firebase.auth().currentUser
    if(user){
      //user signed in, proceed to route
      next()
    } else {
      //no user signed in, redirect to login.
      next({ name: 'ErrorSigninPage'})
    }
  } else {
    next()
  }
})

export default router;
