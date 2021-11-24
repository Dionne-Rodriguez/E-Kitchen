<template>
  <div>
    <b-row cols-sm="1" cols-md="1" cols-lg="2">
    <b-card-group deck v-for="row in formattedProducts">
      <b-col>
      <b-card
        v-for="(product, index) in row"
        :key="index"
        :title="product.title"
        :img-src="product.imageUrl"
        img-alt="Img"
        img-height="100"
        img-width="100"
        img-left
      >
        <b-card-text class="text-dark">
          {{ product.description }}
        </b-card-text>
        <b-card-text class="text-dark">
          {{ product.price }}
        </b-card-text>
          <b-form-spinbutton
            v-model="product.quantity"
            min="1"
            max="100"
          ></b-form-spinbutton>
          <b-btn @click="addItem(product)" class="mt-4" variant="primary" block
            >Add</b-btn
          >
      </b-card>
    </b-col>
    </b-card-group>
    </b-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "product-card",
  props: ["products"],
  computed: {
    // can move into its own mixin
    formattedProducts() {
      return this.products.reduce((c, n, i) => {
        if (i % 2 === 0) c.push([]);
        c[c.length - 1].push(n);
        return c;
      }, []);
    },
  },
  methods: {
    ...mapActions(["addProductToCart"]),
    addItem(product) {
      const { title, price, quantity, id } = product;
      const addedItem = {
        title,
        price,
        quantity,
        id,
      };
      this.addProductToCart(addedItem);
    },
  },
};
</script>

<style lang="scss" scoped>
.card-deck .card {
  margin-top: 100px;
 max-width: calc(100% - 30px);
}
</style>
