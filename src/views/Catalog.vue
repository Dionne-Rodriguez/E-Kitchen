<template>
  <div class="about">
    <nav-bar />
    <h1>Menu</h1>
    <b-container>
      <div>
        <b-nav tabs fill>
          <b-nav-item @click="formatMenu('Burrito')">Burritos</b-nav-item>
          <b-nav-item @click="formatMenu('Chimi')">Chimis</b-nav-item>
          <b-nav-item @click="formatMenu('Nacho')">Nachos</b-nav-item>
          <b-nav-item @click="formatMenu('Fries')">Fries</b-nav-item>
          <b-nav-item @click="formatMenu('Drinks')">Drinks</b-nav-item>
        </b-nav>
      </div>
      <ProductCard :products="this.products()" />
    </b-container>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import ProductCard from "@/components/ProductCard";
import NavBar from "../components/navBar";

export default {
  name: "Catalog",
  components: { NavBar, ProductCard },
  data() {
    return {
      formattedMenu: [],
    };
  },
  computed: {},
  methods: {
    ...mapGetters(["allProducts"]),
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