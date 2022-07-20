/*
 * @Author: wangqiang@feewee.cn
 * @Date: 2022-07-19 11:43:47
 * @LastEditors: wangqiang@feewee.cn
 * @LastEditTime: 2022-07-19 14:39:44
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style/index.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
