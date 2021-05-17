<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
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
    this.axios.get("/user/login").then(res => {
      this.response = res;
      console.log(this.response);
    });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
