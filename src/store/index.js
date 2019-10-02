import Vue from 'vue'
import Vuex from 'vuex'
import common from './common'
import vuexI18n from 'vuex-i18n'
import localeKo from './locale/ko'
import localeEn from './locale/en'
import { setElementUiLocale } from '@/lib/elementUiLocale' //  언어추가하면 이 파일도 수정
import { getStorage, setStorage } from '../lib/cookie'

Vue.use(Vuex)

let state = {
  curLanguage: null,
  languages: [
    {
      key: 'ko',
      name: '한국어',
      i18n: 'ko',
      elementUi: 'ko',
      grid: 'ko'
    },
    {
      key: 'en',
      name: 'English',
      i18n: 'en',
      elementUi: 'en',
      grid: 'en'
    }
  ]
}

const currentLang = getStorage('lang')
state.curLanguage = currentLang ? state.languages.filter(language => language.key === currentLang).first() : state.languages.first()

const mutations = {
  setLanguage (state, lang) {
    state.curLanguage = state.languages.filter(language => language.key === lang).first()
  }
}

const getters = {
  currentLanguage (state) {
    return state.curLanguage
  },
  getLanguages (state) {
    return state.languages
  }
}

const actions = {
  changeLanguage ({ commit, getters }, lang) {
    commit('setLanguage', lang)
    const curLanguage = getters['currentLanguage']

    Vue.i18n.set(curLanguage.i18n)
    setElementUiLocale(curLanguage.elementUi)
    setStorage('lang', lang)
    location.reload()
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  modules: { common }
})

Vue.use(vuexI18n.plugin, store)

Vue.i18n.add('ko', localeKo)
Vue.i18n.add('en', localeEn)

Vue.i18n.set(state.curLanguage.i18n)

export default store
