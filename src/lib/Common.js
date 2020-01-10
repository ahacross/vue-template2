import _ from 'lodash'

export function generateUID() {
  return ((Math.random() * Math.pow(36, 6) << 0).toString(36)).slice(-6)
}

export function numToPX(num) {
  return `${num}px`
}

export function clone(obj) {
  return _.cloneDeep(obj)
}

export function merge(...obj) {
  return _.merge(obj)
}
