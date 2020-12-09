import Vue from 'vue'
import { validateOne, replaceValue } from './validate'
// CP/SP에 맞춰서 변수명 작업함

Vue.directive('inputTypeLimit', {
  bind(el, binding) {
    const inputTarget = el.querySelector('input')
    const rule = binding.value

    // input에서 입력시 keyup 과 유사하게 동작
    el.handler = function () {
      inputTarget.value = replaceValue(inputTarget.value, rule)
    }
    el.addEventListener('input', el.handler)
  },
  unbind(unEl) {
    unEl.removeEventListener('input', unEl.handler)
  }
})

Vue.directive('inputBlur', {
  bind(el, binding, vNode) {
    const inputTargetBlur = el.querySelector('input')
    const vmBlur = vNode.componentInstance
    const rulesBlur = vNode.context.rules[vmBlur.name]

    if (rulesBlur) {
      el.handlerBlur = function () {
        let result
        vmBlur.resultValidate = ''
        let value = inputTargetBlur.value
        if (value !== value.trim()) {
          value = value.trim()
          vmBlur.setValue(value)
        }

        for (const rule1 of rulesBlur) {
          result = validateOne(value, rule1, vmBlur, true, vNode.context)
          if (!result) {
            break
          }
        }

        if (binding.expression) {
          vNode.context[binding.expression]()
        }
      }

      inputTargetBlur.addEventListener('blur', el.handlerBlur)
    }
  },
  unbind(el) {
    el.handlerBlur && el.querySelector('input').removeEventListener('blur', el.handlerBlur)
  }
})

Vue.directive('inputFocusRemoveHyphen', {
  bind(el, binding, vNode) {
    const inputTargetFocus = el.querySelector('input')
    const vmFocus = vNode.componentInstance

    el.handlerFocus = function () {
      vmFocus.setValue(vmFocus.value.split('-').join(''))
    }

    inputTargetFocus.addEventListener('focus', el.handlerFocus)
  },
  unbind(el) {
    el.querySelector('input').removeEventListener('focus', el.handlerFocus)
  }
})

Vue.directive('textareaBlur', {
  bind(el, binding, vNode) {
    const divTarget = el.querySelector('.text')
    const vmTxtBlur = vNode.componentInstance
    const rulesTxtBlur = vNode.context.rules[vmTxtBlur.name]

    if (rulesTxtBlur) {
      el.handlerBlur = function () {
        let result
        vmTxtBlur.resultValidate = ''
        const value = divTarget.innerText.split('\n').join('')

        for (const rule of rulesTxtBlur) {
          result = validateOne(value, rule, vmTxtBlur, true, vNode.context)
          if (!result) {
            break
          }
        }

        if (binding.expression) {
          vNode.context[binding.expression]()
        }
      }

      divTarget.addEventListener('blur', el.handlerBlur)
    }
  },
  unbind(el) {
    el.handlerBlur && el.querySelector('.text').removeEventListener('blur', el.handlerBlur)
  }
})
