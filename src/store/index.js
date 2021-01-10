import Vue from 'vue'
import Vuex from 'vuex'
import common from './common'

Vue.use(Vuex)

const state = {
}

const getters = {
}

const mutations = {
}

const actions = {
  refresh({ commit, dispatch }) {
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  modules: { common }
})

export default store
