import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Commons from '@/commons'

Vue.config.productionTip = false

Vue.mixin({
  computed: {
    $fx() {
      const fx = new Commons(this)
      fx.setVm(this)
      return fx
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
