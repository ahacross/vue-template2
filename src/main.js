import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Commons from '@/commons'

Vue.config.productionTip = false

Vue.mixin({
  computed: {
    $fx() {
      const commons = new Commons(this)
      commons.setVm(this)
      return commons
    }
  }
})

Vue.filter('commaOn', value => {
  const numStr = value.toString().split('.')
  numStr[0] = numStr[0].replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')
  return numStr.join('.')
})

Vue.filter('commaOff', value => {
  return value.split(',').join('')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
