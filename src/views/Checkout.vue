<template>
  <div>
    <nav-bar />
    <b-row
      style="height: 750px"
      class="ml-2"
      cols-sm="2"
      cols-md="2"
      cols-lg="2"
    >
      <b-col sm>
        <h2 class="mt-4">Checkout</h2>
        <b-container>
          <div class="text-left">
            <h2>Your items</h2>
            <b-list-group v-for="(addedItem, item) in checkoutCart" :key="item" class="m-4">
              <b-list-group-item class="flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                  <b-button size="sm" class="m-0 quantity" pill>
                    {{ addedItem.quantity }}
                  </b-button>
                  <h5 class="mb-1">{{ addedItem.title }}</h5>
                  <small class="text-black">{{ addedItem.price }}</small>
                </div>
              </b-list-group-item>
            </b-list-group>
          </div>
        </b-container>
      </b-col>
      <b-col class="bg-light" sm>
        <b-container class="pl-5 pr-5">
          <b-button class="w-50">Place Order</b-button>
          <b-container
            class="
              d-flex
              justify-content-between
              border-bottom border-grey
              mt-5
            "
          >
            <span class="text-right">Total</span>
            <span class="font-weight-bold">{{ calulatedTotal }}</span>
          </b-container>
        </b-container>
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
  data() {
    return {
      total: 0,
    };
  },
  methods: {
    ...mapGetters(["cart"]),
  },
  computed: {
    checkoutCart() {
      return this.cart();
    },  
    calulatedTotal() {
          this.cart().forEach(item => {
           this.total += parseFloat(item.price.replace("$", '')) * item.quantity
          });
          return `$${this.total.toFixed(2)}`
    },
  },
};
</script>

<style>
.quantity {
  width: 8%;
}
</style>
