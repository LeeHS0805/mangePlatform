import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
import './plugins/element.js'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
axios.defaults.baseURL='https://www.liulongbin.top:8888/api/private/v1/'
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
