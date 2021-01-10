import { mobile } from './validator/regExpTypes'
// cont***@dreamplus.asia
export function maskingEmail(email, num = 2) {
  return email ? email.replace(new RegExp(`.(?=.{0,${num}}@)`, 'g'), '*') : ''
}

// 010-1234-****
export function maskingPhoneLast(number) {
  return number ? number.replace(new RegExp(mobile, 'gi'), '$1-$2-****') : ''
}

// 010-****-5678
export function maskingPhoneMiddle(number) {
  return number ? number.replace(new RegExp(mobile, 'gi'), '$1-****-$3') : ''
}
