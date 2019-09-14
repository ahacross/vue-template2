import Vue from 'vue'
import Vuex from 'vuex'
import common from './common'
import vuexI18n from 'vuex-i18n'
import localeKo from './locale/ko'
import localeEn from './locale/en'

Vue.use(Vuex)

let state = {
  curLanguage: null,
  languages: [
    {
      short: 'ko',
      long: '한국어'
    },
    {
      short: 'en',
      long: 'English'
    }
  ]
}

state.curLanguage = state.languages[0]

const mutations = {
  setLanguage (state, lang) {
    state.curLanguage = lang
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  modules: { common }
})

Vue.use(vuexI18n.plugin, store)

Vue.i18n.add('ko', localeKo)
Vue.i18n.add('en', localeEn)

export default store
