<template>
  <div>
    <nav-bar />
    <h1>Menu</h1>
    <b-container fluid>
      <div>
        <b-nav tabs fill>
          <b-nav-item @click="formatMenu('Burrito')">Burritos</b-nav-item>
          <b-nav-item @click="formatMenu('Chimi')">Chimis</b-nav-item>
          <b-nav-item @click="formatMenu('Nachos')">Nachos</b-nav-item>
          <b-nav-item @click="formatMenu('Fries')">Fries</b-nav-item>
          <b-nav-item @click="formatMenu('Drinks')">Drinks</b-nav-item>
        </b-nav>
      </div>
      <ProductCard :products="this.products()" />
      <Cart v-if="this.cart().length > 0" />
    </b-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ProductCard from "@/components/ProductCard";
import NavBar from "../components/navBar";
import Cart from "@/components/Cart";

export default {
  name: "Catalog",
  components: { NavBar, ProductCard, Cart },
  data() {
    return {
      formattedMenu: [],
    };
  },
  computed: {},
  methods: {
    ...mapGetters(["allProducts", "cart"]),
    ...mapActions(["bindProducts"]),
    formatMenu(item) {
      const products = this.allProducts();
      this.formattedMenu = products.filter((product) => product.type == item);
    },
    products() {
      if (this.formattedMenu.length > 0) {
        return this.formattedMenu;
      } else {
        return this.allProducts();
      }
    },
  },
  mounted() {
    this.bindProducts();
  },
};
</script>

<style scoped>
h1 {
  margin-top: 24px;
}
</style>
