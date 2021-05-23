<template>
  <div class="product">
    <product-param>
      <template v-slot:buy>
       <button class="btn">立即購買</button>
      </template>
    </product-param>
  </div>
</template>

<script>
import ProductParam from "../components/ProductParam";
export default {
  name: "product",
  components: {
    ProductParam,
  },
};
</script>

<style></style>
