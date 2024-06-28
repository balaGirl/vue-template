import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import sidebar from './modules/sidebar'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    sidebar,
    user
  },
  getters
})

export default store
