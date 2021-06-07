import Antd, { message } from "ant-design-vue";
//引入ant-design 系統預設css檔
import "ant-design-vue/dist/antd.css";
import axios from "axios";
import { createApp } from "vue";
import App from "./App.vue";
//import env from "./env";
import router from "./router";
import store from "./store";
// 掛載axios到vue實例上
//Vue.prototype.axios = axios;
//根據前端跨域方式做調整 Ex: /a/b  :  /api/a/b => /a/b
axios.defaults.baseURL = "/api";
axios.defaults.timeout = 8000;

// mock 開關
const mock = false;
if (mock) {
  require("./mock/api");
}
// 根據環境變量不同獲取不同的請求地址
// axios.defaults.baseURL = env.baseURL;
// console.log(env.baseURL);
//axios 接口錯誤攔截器
axios.interceptors.response.use(
  response => {
    console.log(response);
    let res = response.data;
    let path = location.hash;
    if (res.status == 0) {
      return res.data;
    } else if (res.status == 10) {
      if (path != "#/index") {
        //未登入且頁面不為首頁頁面就跳轉至登錄頁且判斷為失敗
        window.location.href = "/#/login";
      }
      return Promise.reject();
    } else {
      message.error(res.msg);
      return Promise.reject();
    }
  },
  err => {
    //處理http要求錯誤 ex:500
    let error = err.response;
    message.error(error.data.message);
    return Promise.reject(error);
  }
);

// Vue.use(VueLazyLoad, {
//   loading: "/imgs/loading-svg/loading-bars.svg",
// });
createApp(App)
  .use(Antd)
  .use(router)
  .use(store)
  .mount("#app");
