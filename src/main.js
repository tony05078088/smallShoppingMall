import axios from 'axios'
import { Message, Option, Select } from 'element-ui'
//引入element UI 系統預設css檔
import 'element-ui/lib/theme-chalk/index.css'
import Vue from 'vue'
import VueCookie from 'vue-cookie'
import VueLazyLoad from 'vue-lazyload'
import App from './App.vue'
import router from './router'
import store from './store'
// 掛載axios到vue實例上
Vue.prototype.axios = axios
//根據前端跨域方式做調整 Ex: /a/b  :  /api/a/b => /a/b
axios.defaults.baseURL = '/api'
axios.defaults.timeout = 8000

// mock 開關
const mock = true
if (mock) {
  require('./mock/api')
}
// 根據環境變量不同獲取不同的請求地址
// axios.defaults.baseURL = location.hostname.includes('smallshoppingmall')
//   ? `http://mall-pre.springboot.cn`
//   : `api`
//axios 接口錯誤攔截器
axios.interceptors.response.use(
  response => {
    console.log(response)
    let res = response.data
    let path = location.hash
    if (response.status == 200) {
      return res
    } else if (res.status == 10) {
      if (path != '#/index') {
        //未登入且頁面不為首頁頁面就跳轉至登錄頁且判斷為失敗
        window.location.href = '/#/login'
      }
      return Promise.reject()
    } else {
      Message.error(res.msg)
      return Promise.reject()
    }
  },
  err => {
    //處理http要求錯誤 ex:500
    let error = err.response
    Message.error(error.data.message)
    return Promise.reject(error)
  }
)

Vue.use(VueLazyLoad, {
  loading: '/imgs/loading-svg/loading-bars.svg',
})
Vue.use(VueCookie)
Vue.use(Select)
Vue.use(Option)
//生產環境提示
Vue.config.productionTip = false
Vue.prototype.$message = Message
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
