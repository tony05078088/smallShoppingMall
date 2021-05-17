import axios from "axios";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// 掛載axios到vue實例上
Vue.prototype.axios = axios;

//根據前端跨域方式做調整 Ex: /a/b  :  /api/a/b => /a/b
axios.defaults.baseURL = "/api";
axios.defaults.timeout = 8000
//axios 接口錯誤攔截器
axios.interceptors.response.use(response => {
  let res = response.data;
  if (res.status == 0) {
    return res.data;
  } else if (res.status == 10) {
    //未登入
    window.location.href = "/#/login";
  } else {
    alert(res.msg);
  }
});

//生產環境提示
Vue.config.productionTip = false;
new Vue({
  router,
  render: h => h(App),
}).$mount("#app");
