/*
 * @Descripttion: 
 * @version: 
 * @Author: david
 * @Date: 2020-07-06 19:41:05
 * @LastEditors: david
 * @LastEditTime: 2020-07-06 20:14:09
 */ 
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    tokenAuth: false
  },
  mutations: {
    /**
     * 
     * @param {*} state 
     * @param {Boolean} auth 是否 token已经过期
     */
    setTokenAuth(state, auth) {
      state.tokenAuth = auth
    }
  },
  actions: {
  },
  modules: {
  }
})
