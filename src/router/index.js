/*
 * @Author: wangqiang@feewee.cn
 * @Date: 2022-07-19 11:43:47
 * @LastEditors: wangqiang@feewee.cn
 * @LastEditTime: 2022-07-20 09:14:33
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import TodoApp from '../components/TodoApp/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: TodoApp
  },
  {
    path: '/active',
    component: TodoApp
  },
  {
    path: '/completed',
    component: TodoApp
  }
]

const router = new VueRouter({
  routes,
  linkActiveClass: 'selected'
})

export default router
