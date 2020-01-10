import { LabelName, RuleName, DataRules } from './config'
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

export function validate(that, form) {
  let result = true
  for (const field of form.fields) {
    const vnode = field.$slots.default.first()
    const rules = get(that[DataRules], vnode.data.attrs[RuleName])
    if (rules) {
      const value = vnode.child.value
      const name = vnode.data.attrs[LabelName]

      for (const rule of rules) {
        result = validateOne(that, name, value, vnode, rule)
        if (!result) {
          break
        }
      }
    }
    if (!result) {
      break
    }
  }
  return result
}

export function validateOne(that, name, value, vnode, rule) {
  if (!new RegExp(rule.regexp).test(value)) {
    rule.name = name
    window.$alert(that.$l(rule.msg, rule))
    return false
  } else {
    return true
  }
}
