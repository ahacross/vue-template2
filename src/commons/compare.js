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

const compareFnMap = new Map()
compareFnMap.set('numasc', numberAsc)
compareFnMap.set('numdesc', numberDesc)
compareFnMap.set('asc', asc)
compareFnMap.set('desc', desc)
compareFnMap.set('objasc', objNameAsc)
compareFnMap.set('objdesc', objNameDesc)

export function compare(sorting, type, name) {
  const returnFn = compareFnMap.get(`${type}${sorting}`)
  return name ? returnFn(name) : returnFn
}
