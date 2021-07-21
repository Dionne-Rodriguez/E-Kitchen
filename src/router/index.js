import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/AddProduct.vue'
import firebase from "firebase";

Vue.use(VueRouter)

const routes = [
  {
    path: '/AddProduct',
    name: 'AddProduct',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/',
    name: 'Catalog',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/Catalog.vue')
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to,from,next) => {
//   if(to.matched.some(route => route.meta.requiresAuth)) {
//     console.log(firebase.auth().currentUser)
//   }
// })
export default router
