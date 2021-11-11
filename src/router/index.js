import Vue from "vue";
import VueRouter from "vue-router";
import AddProduct from "../views/AddProduct.vue";
import Checkout from "@/views/Checkout.vue"
import firebase from "firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/AddProduct",
    name: "AddProduct",
    component: AddProduct,
    meta: { requiresAuth: true },
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: Checkout,
  },
  {
    path: "/",
    name: "Catalog",
    component: function() {
      return import(/* webpackChunkName: "about" */ "../views/Catalog.vue");
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((route) => route.meta.requiresAuth)) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user.uid === process.env.VUE_APP_ADMIN) {
        next();
      } else {
        router.replace('/')
       }
    });
  } else {
next()
  }
});
export default router;
