<template>
  <b-navbar class="cart justify-content-center"  type="dark" variant="dark" sticky>
    <p @click="goToCheckout" class="font-weight-bold m-1"> View cart ({{cartLength}})</p>
  </b-navbar>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Cart",
  methods: {
      ...mapGetters(["allProducts", "cart"]),
      goToCheckout() {
        this.$router.push("/checkout")
      }
  },
  computed: {
    cartLength() {
      let amount = 0
       this.cart().forEach(element => {
        amount += element.quantity
      });
        return amount
    }
  }
};
</script>

<style>
.cart {
  bottom: 10px;
}

p {
  color: white;
}
</style>