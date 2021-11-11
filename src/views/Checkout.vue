<template>
  <div>
    <nav-bar />
    <b-row class="mt-4 ml-2 mr-" cols-sm="2" cols-md="2" cols-lg="2">
      <b-col sm>
        <h2>Checkout</h2>
        <b-container>
          <div class="text-left">
            <h2>Your items</h2>
            <b-list-group v-for="item in checkoutCart" :key="item" class="m-4">
              <b-list-group-item class="flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                  <b-button size="sm" class="m-0 quantity" pill>
                    {{ item.quantity }}
                    </b-button>
                  <h5 class="mb-1">{{ item.title }}</h5>
                  <small class="text-black">{{ item.price }}</small>
                </div>
              </b-list-group-item>
            </b-list-group>
          </div>
        </b-container>
      </b-col>
      <b-col sm>
        <h1>box 2</h1>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import NavBar from "../components/navBar";
export default {
  name: "Checkout",
  components: { NavBar },
  methods: {
    ...mapGetters(["cart"]),
  },
  computed: {
    checkoutCart() {
      return this.cart();
    },
  },
};
</script>

<style>
.quantity {
  width: 8%;
}
</style>