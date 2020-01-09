import Vue from 'vue'
import { LabelName, RuleName, DataRules } from './config'
import set from 'lodash/set'
import get from 'lodash/get'

import { validateOne } from './ValidateRule'

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

    let rules = get(vnode.context[DataRules], vnode.data.attrs[RuleName])
    if (rules) {
      el.handlerBlur = function () {
        const that = vnode.context
        const name = vnode.data.attrs[LabelName]
        const value = inputTarget.value
        let result

        for (const rule of rules) {
          result = validateOne(that, name, value, vnode, rule)
          if (!result) {
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
