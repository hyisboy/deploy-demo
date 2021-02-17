/*
 * @Descripttion: 
 * @version: 
 * @Author: david
 * @Date: 2020-07-06 19:41:05
 * @LastEditors: david
 * @LastEditTime: 2020-07-07 13:00:30
 */ 
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
  const routes = [
  {
    path: '/',
    name: 'index',
    component: ()=> import('@/views/index.vue'),
    meta: {
      title:'首页',
    }
  },
  {
    path: '/login',
    name: 'login',
    component: ()=> import('@/views/login.vue'),
    meta: {
      title:'登录页面'
    }
  },
]

const router = new VueRouter({
  routes
})

export default router
