import { empty, email, password, mobile, num } from './RegExpTypes'

export function required() {
  return {
    regexp: empty,
    msg: '값이 없습니다.',
    once: true,
    setMsg: function(vm) {
      this.once = false
      this.msg = `${vm.label || vm.placeholder} ${this.msg}`
    }
  }
}

export const loginEmail = {
  regexp: email,
  msg: '이메일ID 형식이 올바르지 않습니다.'
}

export const loginPassword = {
  regexp: password,
  msg: '입력형식이 올바르지 않습니다.'
}

export function comparePassword(compareName) {
  return {
    compare: compareName,
    msg: '입력한 비밀번호와 맞지 않습니다.'
  }
}

export function lengMin (min) {
  return {
    min,
    regexp: `^.{${min},}$`,
    msg: 'validator.min'
  }
}

export function maxInput(max, isReplace) {
  return {
    min: 1,
    max,
    regexp: `^.{1,${max}}$`,
    msg: `${max}자 이내로 입력해 주세요.`,
    isReplace,
    replace: replaceLength
  }
}

function replaceLength(value, { min, max }) {
  return value.slice(min, max)
}

export function lengMinMax (min, max) {
  return {
    min,
    max,
    regexp: `^.{${min},${max}}$`,
    msg: 'validator.minmax'
  }
}

export const checkPhoneNum = {
  regexp: mobile,
  msg: '휴대폰 번호를 정확히 입력해주세요.'
}

export const onlyNum = num
