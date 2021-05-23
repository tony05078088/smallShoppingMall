<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import axios from "axios";
// import jsonp from "jsonp";
//import storage from "./storage";
export default {
  name: "App",
  components: {},
  data() {
    return {
      response: {},
    };
  },
  mounted() {
    //storage.getStorage();
    //請求本地靜態加載json文件的形式
    //     this.axios.get("/mock/user/login.json").then(res => {
    //   this.res = res;
    // });
    //通過easy-mock平台實現數據mock 已經壞掉了
    //     this.axios.get("/user/login.json").then(res => {
    //   this.res = res;
    // });
    //本地集成mock.js 實現數據mock
    // this.axios.get("/user/login").then(res => {
    //   this.response = res;
    //   console.log(this.response);
    // });
    this.getUser();
    this.getCartCount();
  },
  methods: {
    getUser() {
      this.axios.get("/user").then(res => {
        console.log(res);
        //todo: 保存到vuex中
        this.$store.dispatch("saveUserName", res.username);
      });
    },
    getCartCount() {
      this.axios.get("/carts/products/sum").then(res => {
        console.log(res);
        this.$store.dispatch("saveCartCount", res);
      });
    },
  },
};
</script>

<style lang="scss">
@import "./assets/scss/reset.scss";
@import "./assets/scss/config.scss";
@import "./assets/scss/button.scss";
</style>
