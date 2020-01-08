import { empty } from './RegExpTypes'
import get from 'lodash/get'
export function required() {
  return {
    regexp: empty,
    msg: 'validator.empty'
  }
}

export function lengMin(min) {
  return {
    min,
    regexp: `^.{${min},}$`,
    msg: 'validator.min'
  }
}

export function lengMax(max) {
  return {
    max,
    regexp: `^.{0,${max}}$`,
    msg: 'validator.max'
  }
}

export function lengMinMax(min, max) {
  return {
    min,
    max,
    regexp: `^.{${min},${max}}$`,
    msg: 'validator.minmax'
  }
}

export function validate(that, form, params) {
  let result = true
  for (const field of form.fields) {
    const vnode = field.$slots.default.first()
    const rules = get(that.rules, vnode.data.attrs.rules)
    if (rules) {
      const value = vnode.elm.querySelector('input').value
      const name = vnode.data.attrs.name
      for (const rule of rules) {
        if (!new RegExp(rule.regexp).test(value)) {
          rule.name = name
          that.$alert(that.$l(rule.msg, rule))
          result = false
          break
        }
      }
    }
  }
  return result
}
