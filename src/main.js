  import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
  import firebase from "firebase";
  import { firestorePlugin }from 'vuefire'
  import {firestoreAction} from 'vuexfire'

//STYLING
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false



Vue.use(firestoreAction)
  Vue.use(firestorePlugin)
Vue.use(BootstrapVue)

Vue.use(IconsPlugin)

Vue.config.productionTip = false

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User logged in already or has just logged in.
      console.log(user.uid);
    } else {
      console.log("logged out")
      // User not logged in or has just logged out.
    }
  });

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
