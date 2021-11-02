<template>
  <div>
    <b-card-group deck deck v-for="row in formattedProducts">
      <b-card
        v-for="club in row"
        :title="club.title"
        :img-src="club.imageUrl"
        img-alt="Img"
        img-height="300"
        img-width="300"
        img-top
      >
        <p class="card-text">
          {{ club.description }}
        </p>
        <div slot="footer">
          <b-form-spinbutton min="1" max="100"></b-form-spinbutton>
          <b-btn class="mt-4" variant="primary" block>Add</b-btn>
        </div>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
export default {
  name: "product-card",
  props: ["products"],
  computed: {
    // can move into its own mixin
    formattedProducts() {
      return this.products.reduce((c, n, i) => {
        if (i % 4 === 0) c.push([]);
        c[c.length - 1].push(n);
        return c;
      }, []);
    },
  },
  methods: {},
};
</script>

<style scoped>
.card-group .card {
  max-width: 25%;
}

.card-deck .card {
  margin-top: 100px;
  max-width: calc(25% - 30px);
}
</style>
