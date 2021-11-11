import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import { db, catalogReference, storageRef, auth } from "../firebase/firebase";
import { firestoreAction, vuexfireMutations } from "vuexfire";

const axios = require("axios");

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState({ storage: window.sessionStorage })],
  state: {
    products: [],
    cart: [],
  },
  mutations: {
    ...vuexfireMutations,
    setProducts: (state, products) => {
      state.products = products;
    },
    addProductToCart: (state, item) => {
      state.cart.push(item);
    },
  },
  actions: {
    async addProductToCart({ commit }, product) {
      commit("addProductToCart", product);
    },
    async addProduct({ commit }, product) {
      await catalogReference.add(product).then(() => {
        console.log("Product Successfully Uploaded!");
      });
    },
    async handleSignUp({ commit }, credentials) {
      console.log("handling....");
      return new Promise(async (resolve, reject) => {
        await auth
          .createUserWithEmailAndPassword(
            credentials.email,
            credentials.password
          )
          .then(() => {
            resolve({
              message: "Email Sign Up Successful 😎",
              code: 200,
            });
          })
          .catch((err) => reject({ error: err, code: 400 }));
      });
    },
    async handleLogIn({ commit }, credentials) {
      console.log("handling....");
      return new Promise(async (resolve, reject) => {
        await auth
          .signInWithEmailAndPassword(credentials.email, credentials.password)
          .then(() => {
            resolve({
              message: "Log In Successful 😎",
              code: 200,
            });
          })
          .catch((err) => reject({ error: err, code: 400 }));
      });
    },
    async handleLogOut() {
      return new Promise(async (resolve, reject) => {
        await auth
          .signOut()
          .then(() => {
            console.log("signed out");
            resolve({
              message: "Log out Successful 😎",
              code: 200,
            });
          })
          .catch((err) => console.log(err));
      });
    },
    async uploadAndReturnDownLoadUrl({ commit }, file) {
      return new Promise(async (resolve, reject) => {
        await storageRef
          .child("catalog/" + file.name)
          .put(file)
          .then(async () => {
            console.log("Uploaded a blob or file!");
            await storageRef
              .child("catalog/" + file.name)
              .getDownloadURL()
              .then((url) => {
                resolve(url);
              });
          });
      });
    },
    bindProducts: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef("products", db.collection("menu"));
    }),
    unbindProducts: firestoreAction(({ unbindFirestoreRef }) => {
      unbindFirestoreRef("todos");
    }),
  },
  getters: {
    allProducts: (state) => {
      return state.products;
    },
    cart: (state) => {
        return state.cart
    },
  },
});
