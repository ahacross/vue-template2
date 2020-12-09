import Utils from './index'
import { validate, validateTarget, validateCustom, validateEmpty } from '@/commons/validator/Validate'

function onLoading() {
  this.$root.$children[0].onLoading()
}

function offLoading() {
  this.$root.$children[0].offLoading()
}
const utils = new Utils()
console.log(utils)
utils.validate = validate
utils.validateTarget = validateTarget
utils.validateCustom = validateCustom
utils.validateEmpty = validateEmpty

const breakpoint = window.matchMedia('(min-width:769px)')
Utils.matches = () => breakpoint.matches

export default {
  install (Vue) {
    Vue.prototype.$loadingOn = onLoading
    Vue.prototype.$loadingOff = offLoading
  }
}
