import Vue from 'vue'
import set from 'lodash/set'
import get from 'lodash/get'

const changeValue = function(value, vnode, target) {
  target.value = value
  set(vnode.context, vnode.data.model.expression, value)
}

Vue.directive('onlyInputRegexp', {
  bind: function (el, binding, vnode) {
    const inputTarget = el.querySelector('input')
    let regTxt = binding.value

    // input에서 입력시 keyup 과 유사하게 동작
    el.handler = function () {
      changeValue(inputTarget.value.replace(new RegExp(`[^${regTxt}]`, 'g'), ''), vnode, inputTarget)
    }
    el.addEventListener('input', el.handler)

    let rules = get(vnode.context.rules, vnode.data.attrs.rules)
    if (rules) {
      el.handlerBlur = function () {
        const value = inputTarget.value
        const that = vnode.context
        const name = vnode.data.attrs.name
        for (const rule of rules) {
          if (!new RegExp(rule.regexp).test(value)) {
            rule.name = name
            that.$alert(that.$l(rule.msg, rule))
            break
          }
        }
      }

      inputTarget.addEventListener('blur', el.handlerBlur)
    }
  },
  unbind: function (el) {
    el.removeEventListener('input', el.handler)
    el.handlerBlur && el.querySelector('input').removeEventListener('blur', el.handlerBlur)
  }
})
