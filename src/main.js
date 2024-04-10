import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './assets/global.less'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.config.productionTip = false

// 设置 axios 的请求根路径
axios.defaults.baseURL = 'http://www.liulongbin.top:3008'
Vue.prototype.$http = axios
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
