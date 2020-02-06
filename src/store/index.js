import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import navigation from './modules/navigation'
import products from './modules/products'

Vue.use(Vuex)

export default new Vuex.Store({
  getters: getters,
  modules: {
    navigation,
    products 
  }
})
