<template>
  <div>
    <order-header :title="title">
      <template v-slot:tips>
        <span>{{ tips }}</span>
      </template>
    </order-header>
    <router-view></router-view>
    <service-bar></service-bar>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import OrderHeader from "../components/OrderHeader";
import NavFooter from "../components/NavFooter";
import ServiceBar from "../components/ServiceBar";

export default {
  name: "order",
  components: {
    OrderHeader,
    NavFooter,
    ServiceBar,
  },
  data() {
    return {
      title: "",
      tips: "",
    };
  },
  mounted() {
    let path = this.$route.path;
    if (path === "/order/confirm") {
      this.title = "確認訂單";
      this.tips = "請填寫收貨地址";
    } else if (path == "/order/list") {
      this.title = "訂單列表";
      this.tips = "請謹防釣魚連接或詐騙電話";
    } else if (path == "/order/pay") {
      this.title = "訂單支付";
      this.tips = "請謹防釣魚連接或詐騙電話";
    } else {
      this.title = "訂單支付";
      this.tips = "請謹防釣魚連接或詐騙電話";
    }
  },
};
</script>

<style></style>
