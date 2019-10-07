import _ from 'lodash'

export function generateUID() {
  return ((Math.random() * Math.pow(36, 6) << 0).toString(36)).slice(-6)
}

export function deepCopy (obj) {
  return _.cloneDeep(obj)
}

export function recur (obj) {
  return _.cloneDeep(obj)
}
//
// export function fnRecursive(time, checkFn, actionFn) {
//   if (checkFn()) {
//     return actionFn()
//   } else {
//     setTimeout(function() {
//       fnRecursive(time, checkFn, actionFn)
//     }, time)
//   }
// }
//
// export function fnRecursive2(time, checkFn) {
//   return new Promise(resolve => {
//     if (checkFn()) {
//       return resolve(true)
//     } else {
//       setTimeout(() => {
//         fnRecursive2(time, checkFn)
//       }, time)
//     }
//   })
// }
//
// function recurTimeout(checkFn, time) {
//   if (checkFn()) {
//     return true
//   } else {
//     setTimeout(() => {
//       if (checkFn()) {
//         console.log(new Date())
//         recurTimeout(checkFn, time)
//       }
//     }, time)
//   }
// }
//
// function recurCheck(checkFn, time) {
//   return new Promise(resolve => {
//     if (recurTimeout(checkFn, time)) {
//       return resolve(true)
//     }
//   })
// }
