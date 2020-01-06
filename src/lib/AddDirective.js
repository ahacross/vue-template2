import Vue from 'vue'

Vue.directive('onlyRegexp', {
  bind: function (el, binding, vnode) {
    const inputTarget = el.querySelector('input')
    let regTxt = binding.value
    console.log(regTxt)

    el.handler = function () {
      inputTarget.value = inputTarget.value.replace(new RegExp(`[^${regTxt}]`, 'g'), '')
    }
    el.addEventListener('input', el.handler)

    let rules = inputTarget.dataset.rules
    if (rules) {
      rules = JSON.parse(rules)
      el.handlerBlur = function () {
        if (inputTarget.value) {
          const rulesResult = rules.some(rule => {
            return new RegExp(rule).test(inputTarget.value)
          })

          if (!rulesResult) {
            vnode.componentInstance.$alert('IPv4형식이나 도메인 형식에 맞지 않습니다.')
            inputTarget.value = ''
          } else {
            const idx = Number(inputTarget.dataset.idx)
            const manager = vnode.componentInstance.$parent.$parent.$parent.form.Manager
            const result = manager.filter(({ Ip }, index) => {
              return index !== idx && Ip === inputTarget.value
            })

            if (result.length > 0) {
              vnode.componentInstance.$alert('이미 추가 하셨습니다.')
              inputTarget.value = ''
            } else {
              manager[idx].Ip = inputTarget.value
            }
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
