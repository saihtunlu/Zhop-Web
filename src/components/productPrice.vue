<template>
  <div>
    <div v-if="product.type">
      <div v-if="product.type === 'Simple Product'">
        <p v-if="product.sale_price" class="primary">
          {{ product.sale_price }}Ks
          <span class=" sm-text line-through gray ml-2"
            >{{ product.regular_price }}Ks</span
          >
        </p>
        <p v-else class="primary">{{ product.regular_price }}Ks</p>
      </div>
      <div v-if="product.type === 'Variable Product'">
        <p class="primary ">{{ priceRange }}</p>
      </div>
    </div>
    <div v-else>
      <p v-if="product.sale_price" class="primary">
        {{ product.sale_price }}Ks
        <span class=" sm-text line-through gray ml-2"
          >{{ product.regular_price }}Ks</span
        >
      </p>
      <p v-else class="primary">{{ product.regular_price }}Ks</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {},
  },
  data() {
    return {
      priceRange: null,
    };
  },
  mounted() {
    if (this.product.type === "Variable Product") {
      var prices = [];
      this.product.variations.forEach((data) => {
        prices.push(parseInt(data.regular_price));
      });
      var minVal = Math.min(...prices);
      var maxVal = Math.max(...prices);
      this.priceRange =
        minVal === maxVal ? minVal + "Ks" : `${minVal}Ks - ${maxVal}Ks`;
    }
  },
};
</script>
