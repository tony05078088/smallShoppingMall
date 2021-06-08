<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import axios from "axios";
// import jsonp from "jsonp";
//import storage from "./storage";
import cookie from "vue-cookie";
import {useStore} from "vuex";
import {onMounted} from "vue";
export default {
  name: "App",
  setup() {
    const store = useStore();
    const getUser = () => {
        axios.get("/user").then((res = {}) => {
          //todo: 保存到vuex中
          store.commit("saveUserName", res.username);
        });
      },
      getCartCount = () => {
        axios.get("/carts/products/sum").then((res = 0) => {
          console.log(res);
          store.commit("saveCartCount", res);
        });
      };
    onMounted(() => {
      //判斷當前為登錄狀態時拉取購物車及使用者訊息
      if (cookie.get("userId")) {
        getUser();
        getCartCount();
      }
    });
    return {
      getUser,
      getCartCount,
    };
  },
  //mounted() {
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
  //},
};
</script>

<style lang="scss">
@import "./assets/scss/reset.scss";
@import "./assets/scss/config.scss";
@import "./assets/scss/button.scss";
</style>
