import cloneDeep from 'lodash/cloneDeep'
import merge from 'lodash/merge'
import nth from 'lodash/nth'
import last from 'lodash/last'
import findIndex from 'lodash/findIndex'
import camelCase from 'lodash/camelCase'
import kebabCase from 'lodash/kebabCase'
import snakeCase from 'lodash/snakeCase'
import { Mix } from 'mix-classes'
import Dom from './Dom'
import Storage from './Storage'
import { format, diff } from '@/commons/Date'
window.format = format
window.diff = diff
class Commons {
  setVm(vm) {
    this.vm = vm
  }

  getVm() {
    return this.vm
  }

  splitJoin(arr, sep1, sep2) {
    return arr.split(sep1).join(sep2)
  }

  firstUpperCase(str) {
    return str.charAt(0).toUpperCase() + str.substr(1)
  }

  commaOn(str) {
    const numStr = str.toString().split('.')
    numStr[0] = numStr[0].replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')
    return numStr.join('.')
  }

  commaOff(str) {
    return str.split(',').join('')
  }

  nth(arr, idx) {
    return nth(arr, idx)
  }

  first(arr) {
    return nth(arr, 0)
  }

  last(arr) {
    return last(arr)
  }

  getKeys(obj) {
    return Object.keys(obj)
  }

  isEmpty(obj) {
    if (!Array.isArray(obj) && typeof obj === 'object') {
      obj = this.getKeys(obj)
    }
    return !obj.length
  }

  findIndex(arr, fn) {
    return findIndex(arr, fn)
  }

  pageMove({ name, path, params = {} }) {
    const vm = this.getVm()

    if (path) {
      vm.$router.push(path).catch(() => { })
    } else {
      vm.$router.push({ name, params }).catch(() => { })
    }
  }

  clone(obj) {
    return cloneDeep(obj)
  }

  merge (...obj) {
    return merge(...obj)
  }

  camelCase(str) {
    return camelCase(str)
  }

  kebabCase(str) {
    return kebabCase(str)
  }

  snakeCase(str) {
    return snakeCase(str)
  }

  getBytesUnit() {
    return ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  }

  // 5 MB => 5 * 1024 * 1024
  getBytes(limit) {
    const [num, unit] = limit.replace(/([\d]*)([a-zA-Z]*)/, '$1-$2').split('-')
    const units = this.getBytesUnit()
    return Number(num) * Math.pow(1024, findIndex(units, u => u === unit))
  }

  // 10 KB
  getStringBytes(bytes, decimals = 2) {
    if (bytes === 0) {
      return '0 Bytes'
    }
    const dm = decimals < 0 ? 0 : decimals

    const units = this.getBytesUnit()
    const index = Math.floor(Math.log(bytes) / Math.log(1024))

    return `${(bytes / Math.pow(1024, index)).toFixed(dm)} ${units[index]}`
  }

  range(start, end, step, templateFn, isReverse) {
    let arr = []
    for (;start <= end; start += step) {
      arr.push(start)
    }
    arr = templateFn ? arr.map(templateFn) : arr
    return isReverse ? arr.reverse() : arr
  }
}

export default class extends Mix(Commons, Dom, Storage) {}
