import cloneDeep from 'lodash/cloneDeep'
import merge from 'lodash/merge'
import findIndex from 'lodash/findIndex'
import camelCase from 'lodash/camelCase'
import kebabCase from 'lodash/kebabCase'
import snakeCase from 'lodash/snakeCase'
import { Mix } from 'mix-classes'
import Dom from './Dom'
import Storage from './Storage'
import './addPrototypes'
import { format, diff } from '@/commons/Date'
window.format = format
window.diff = diff
class Commons {
  setVm(ins) {
    this.vm = ins
  }

  getVm(name) {
    return this.vm[name]
  }

  commaOn(str) {
    const numStr = str.toString().split('.')
    numStr[0] = numStr[0].replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')
    return numStr.join('.')
  }

  commaOff(str) {
    return str.split(',').join('')
  }

  getKeys(obj) {
    return Object.keys(obj)
  }

  getEntries(obj) {
    return Object.entries(obj)
  }

  getValues(obj) {
    return Object.values(obj)
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
    const $router = this.getVm('$router')

    if (path) {
      $router.push(path).catch(() => { })
    } else {
      $router.push({ name, params }).catch(() => { })
    }
  }

  clone(obj) {
    return cloneDeep(obj)
  }

  merge(...obj) {
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

  getBytesUnit = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  // 5 MB => 5 * 1024 * 1024
  getBytes(limit) {
    const [num, unit] = limit.replace(/([\d]*)([a-zA-Z]*)/, '$1-$2').split('-')
    const units = this.getBytesUnit
    return Number(num) * Math.pow(1024, findIndex(units, u => u === unit))
  }

  // 10 KB
  getStringBytes(bytes, decimals = 2) {
    if (bytes === 0) {
      return '0 Bytes'
    }
    const dm = decimals < 0 ? 0 : decimals

    const units = this.getBytesUnit
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

  async delay(ms) {
    return await new Promise(resolve => setTimeout(resolve, ms))
  }
}

export default class extends Mix(Commons, Dom, Storage) {}
