/* eslint-disable */
import Vue from 'vue'
import App from './app1.vue'
import router from './router'
import elementUi from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
// import 'lib-flexible'
import axios from 'axios'
import dataV from '@jiaminghi/data-view'


 //axios.defaults.baseURL = 'http://4l9r771913.qicp.vip/pollution'
axios.defaults.baseURL = 'http://47.110.134.59:8080/pollution'

Vue.config.productionTip = false
Vue.use(elementUi)
Vue.use(dataV)
Vue.prototype.$axios = axios

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')