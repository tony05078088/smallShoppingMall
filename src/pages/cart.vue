<template>
  <div>
    <order-header title="我的購物車">
      <template v-slot:tips>
        <span>提示：產品是否購買成功，以最終下單為準，請盡快結算</span>
      </template>
    </order-header>
    Cart
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import OrderHeader from "../components/OrderHeader";
import NavFooter from "../components/NavFooter";
export default {
  name: "Cart",
  components: {
    OrderHeader,
    NavFooter,
  },
};
</script>

<style></style>
