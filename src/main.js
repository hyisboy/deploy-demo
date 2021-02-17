/*
 * @Descripttion: 
 * @version: 
 * @Author: david
 * @Date: 2020-07-06 19:41:05
 * @LastEditors: david
 * @LastEditTime: 2020-07-06 22:47:06
 */ 
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css';
import {element} from './utils/register-element-ui';
import {setDomain} from './utils/public/system';
Vue.config.productionTip = false
import {createRem} from './utils/rem';
Vue.use(element); // 注册组件
Vue.prototype.$rem  = createRem(); // 配置rem
setDomain(); // 设置一级域名
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
