// Common State.
const state = {
  menuPath: []
}

const mutations = {
  menuPath(state, menuPath) {
    state.menuPath = menuPath
  }
}

const getters = {
  getMenuPath(state) {
    return state.menuPath
  }
}

const actions = {
}

// Global module loaded on first app load.
export default {
  namespaced: true,
  state: Object.assign({}, state),
  mutations,
  getters,
  actions
}
