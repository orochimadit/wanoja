import Vue from 'vue'
import Vuex from 'vuex'
import cart from './stores/cart'
import alert from './stores/alert' 
import dialog from './stores/dialog'
import auth from './stores/auth'
import region from './stores/region' 

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sideBar: false,
    prevUrl: '',
    payment:[]
  },
  mutations: {
    setPrevUrl: (state, value) => {
      state.prevUrl = value
    },
    setSideBar: (state, value) => {
      console.log({value})
        state.sideBar = value
    },
    setPayment: (state, value) => {
      state.payment = value
    },
  },
  actions: {
    setSideBar: ({commit}, value) => {
      commit('setSideBar', value)
    },
    setPrevUrl: ({commit}, value) => {
      commit('setPrevUrl', value)
    },
    setPayment: ({commit}, value) => {
      commit('setPayment', value)
    },
  },
  getters: {
    sideBar: state => state.sideBar,
    prevUrl: state => state.prevUrl,
    payment: state => state.payment,
  },
  modules: {
    cart, // <= tambahkan ini
    alert,
    dialog ,
    auth,
    region
  }

})