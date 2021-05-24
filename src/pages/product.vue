<template>
  <div class="product">
    <product-param>
      <template v-slot:buy>
        <button class="btn">立即購買</button>
      </template>
    </product-param>
    <div class="h">123</div>
    <div class="h">123</div>
    <div class="h">123</div>
    <div class="h">123</div>
    <div class="h">123</div>
    <div class="h">123</div>
    <div class="h">123</div>
    <div class="h">123</div>
    <div class="h">123</div>
    <div class="h">123</div>
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

<style lang="scss">
.h {
  height: 150px;
  background-color: red;
}
</style>
