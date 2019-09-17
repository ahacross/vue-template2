import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import Meta from 'vue-meta'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.use(Meta)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  metaInfo: {
    title: '뭐라할까',
    titleTemplate: '%s',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, minimal-ui, viewport-fit=cover' }
    ]
  }

}).$mount('#app')
