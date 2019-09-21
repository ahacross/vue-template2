import Vue from 'vue'
import Vuex from 'vuex'
import common from './common'
import vuexI18n from 'vuex-i18n'
import localeKo from './locale/ko'
import localeEn from './locale/en'
import locale from 'element-ui/lib/locale'
import localeMap from '@/lib/elementUiLocaleMap' //  언어추가하면 이 파일도 수정

Vue.use(Vuex)

let state = {
  curLanguage: null,
  languages: [
    {
      key: 'ko',
      name: '한국어',
      i18n: 'ko',
      elementUi: 'ko'
    },
    {
      key: 'en',
      name: 'English',
      i18n: 'en',
      elementUi: 'en'
    }
  ]
}

state.curLanguage = state.languages[0]

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
    locale.use(localeMap[curLanguage.elementUi])
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
