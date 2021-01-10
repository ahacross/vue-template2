import { getMomentDate } from '@/commons/date'

function asc(a, b) {
  return a - b
}

function desc(a, b) {
  return b - a
}

function numberAsc(a, b) {
  return asc(Number(a), Number(b))
}

function numberDesc(a, b) {
  return desc(Number(a), Number(b))
}

function objNameAsc(name) {
  return function (a, b) {
    return asc(a[name], b[name])
  }
}

function objNameDesc(name) {
  return function (a, b) {
    return desc(a[name], b[name])
  }
}

function dateType(str) {
  return getMomentDate(str).valueOf()
}

function dateNameAsc(name) {
  return function (a, b) {
    return asc(dateType(a[name]), dateType(b[name]))
  }
}

function dateNameDesc(name) {
  return function (a, b) {
    return desc(dateType(a[name]), dateType(b[name]))
  }
}

const compareFnMap = new Map()
compareFnMap.set('numasc', numberAsc)
compareFnMap.set('numdesc', numberDesc)
compareFnMap.set('asc', asc)
compareFnMap.set('desc', desc)
compareFnMap.set('objasc', objNameAsc)
compareFnMap.set('objdesc', objNameDesc)
compareFnMap.set('dateasc', dateNameAsc)
compareFnMap.set('datedesc', dateNameDesc)

export function compare(sorting, type, name) {
  const returnFn = compareFnMap.get(`${type}${sorting}`)
  return name ? returnFn(name) : returnFn
}
